import React, { memo } from 'react';
import LoginForm from './components/LoginForm';
import ROUTES from '../../routes';

import { LOGIN_INPUTS_OPTIONS } from '../../constants/login';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './index.scss';

const Login = ({ isAuthenticated }) => {
  // TODO create shared HOC for this
  return isAuthenticated ? (
    <Redirect to={ROUTES.ROOT} />
  ) : (
    <LoginForm options={LOGIN_INPUTS_OPTIONS} />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated,
});

const LoginContainer = connect(mapStateToProps, null)(Login);

export default memo(LoginContainer);
