import React, { memo, useState, useEffect } from 'react';

import { Input, Button, ErrorBox } from '../../../components';

import { isEmpty, processValidationsArray } from '../../../util/validations';

import { CREDENTIALS } from '../../../constants/user';

import './LoginForm.scss';

const LoginForm = ({ login, options }) => {
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

  const [formError, setFormError] = useState('');

  const onFormSubmit = (e) => {
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

    if (
      CREDENTIALS.username === formData.username.value &&
      CREDENTIALS.password === formData.password.value
    ) {
      localStorage.setItem('auth', true);

      return login(true);
    }

    setFormError('There is no user with provided credentials');
  };

  const onInput = (e) => {
    const field = {
      ...formData[e.target.name],
      value: e.target.value,
      error: '',
    };

    setFormData({ ...formData, [e.target.name]: field });
  };

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

export default memo(LoginForm);
