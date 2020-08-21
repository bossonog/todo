import React, { memo, useState, useEffect, useCallback } from 'react';
import { Input, Button, ErrorBox } from '../../../components';
import { processValidationsArray } from '../../../util/validations';
import { LOGIN } from '../../../app/authentication/actionTypes';

import './LoginForm.scss';
import { connect } from 'react-redux';

const LoginForm = ({ options, login, formError }) => {
  const [formData, setFormData] = useState({
    username: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
  });

  const onFormSubmit = useCallback((e) => {
    e.preventDefault();

    const _formData = JSON.parse(JSON.stringify(formData));

    let hasErrors = false;

    Object.keys(formData).forEach((field) => {
      const error = processValidationsArray(
        options[field].validationFunctions,
        formData[field].value
      );

      if (error) {
        _formData[field].error = error;
        hasErrors = true;
      }
    });

    setFormData(_formData);

    if (hasErrors) {
      return;
    }

    const credentials = {
      username: formData.username.value,
      password: formData.password.value,
    };

    login(credentials);
  });

  const onInput = useCallback((e) => {
    const field = {
      ...formData[e.target.name],
      value: e.target.value,
      error: '',
    };

    setFormData({
      ...formData,
      [e.target.name]: field,
    });
  });

  return (
    <form className="login" onSubmit={onFormSubmit}>
      {Object.keys(options).map((field) => {
        const {
          id,
          type,
          className,
          name,
          placeholder,
          validationFunctions,
        } = options[field];

        return (
          <Input
            key={id}
            type={type}
            className={className}
            value={formData[name].value}
            name={name}
            placeholder={placeholder}
            validationFunctions={validationFunctions}
            onInput={onInput}
            onSubmit={onFormSubmit}
            error={formData[field].error}
          />
        );
      })}
      <Button className="login-button" title="Sign in" onClick={onFormSubmit} />
      {formError && <ErrorBox className="login-error" error={formError} />}
    </form>
  );
};

const mapStateToProps = (state) => ({
  formError: state.authentication.error,
});

const mapDispatchToProps = (dispatch) => ({
  login: (credentials) =>
    dispatch({ type: LOGIN.REQUEST, payload: { credentials } }),
});

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default memo(LoginFormContainer);
