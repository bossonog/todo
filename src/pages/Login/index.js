import React, { memo } from 'react';

import LoginForm from './components/LoginForm';

import { LOGIN_INPUTS_OPTIONS } from '../../constants/login';

import './index.scss';

const Login = ({ login }) => {
  return <LoginForm login={login} options={LOGIN_INPUTS_OPTIONS} />;
};

export default memo(Login);
