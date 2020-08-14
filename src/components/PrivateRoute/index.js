import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ROUTES from '../../routes';

// const PrivateRoute = ({
//   path,
//   isAuthenticated,
//   children,
//   exact,
// }) => (
//   <Route exact={exact} path={path}>
//     {/* {isAuthenticated ? children : <Redirect to={ROUTES.AUTH.LOGIN} />} */}
//     {children}
//   </Route>
// );

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to={ROUTES.AUTH.LOGIN} />)} />
);

export default PrivateRoute;
