import React from 'react';

import { Input, Button } from '../../../../components';

import { isEmpty } from '../../../../util/validations';

import './index.scss';

const LoginForm = ({ onSubmit, onInput, values }) => (
  <form className="login" onSubmit={onSubmit}>
    <Input
      type="text"
      lassName="login-control"
      value={values.username}
      name="username"
      placeholder="Login"
      validationFunctions={[isEmpty]}
      onInput={onInput}
      onSubmit={onSubmit}
    />
    <Input
      type="password"
      className="login-control"
      value={values.password}
      name="password"
      placeholder="Password"
      validationFunctions={[isEmpty]}
      onInput={onInput}
      onSubmit={onSubmit}
    />
    <Button className="login-button" title="Sign in" onClick={onSubmit} />
  </form>
);

export default LoginForm;
