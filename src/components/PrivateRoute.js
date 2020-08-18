import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import ROUTES from '../routes';
import { AuthenticationContext } from '../config';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return isAuthenticated ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to={ROUTES.AUTH.LOGIN} />
  );
};

export default PrivateRoute;
