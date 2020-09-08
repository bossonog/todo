import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorBox, Input } from '../../../components';
import { connect } from 'react-redux';
import { LOGIN } from '../../../app/authentication/actionTypes';

const LoginHookForm = ({ options, login, formError }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const { username, password } = data;

    login({ username, password });
  };

  return (
    <form className="login" onSubmit={handleSubmit(onSubmit)}>
      {Object.keys(options).map((field) => {
        const { id, type, className, name, placeholder, validations } = options[
          field
        ];

        return (
          <Input
            key={id}
            type={type}
            className={className}
            name={name}
            placeholder={placeholder}
            error={errors[name] && <p>{errors[name].message}</p>}
            ref={register({
              required: {
                value: true,
                message: `${name} is required`,
              },
              minLength: {
                value: validations.minLength,
                message: `The min length of the ${name} field must be ${validations.minLength}`,
              },
              maxLength: {
                value: validations.maxLength,
                message: `The max length of the ${name} field must be ${validations.maxLength}`,
              },
            })}
          />
        );
      })}
      <Input className="login-button" value="Sign in" type="submit" />
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

const LoginHookFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginHookForm);

export default memo(LoginHookFormContainer);
