import React, { memo } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { APP_ROUTES } from '../routes';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return isAuthenticated ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to={APP_ROUTES.AUTH.LOGIN} />
  );
};

export default memo(PrivateRoute);
