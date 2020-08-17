import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ROUTES from '../../routes';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) =>
  isAuthenticated ? <Route {...rest} component={Component} /> : <Redirect to={ROUTES.AUTH.LOGIN} />;

export default PrivateRoute;
