import React, { useEffect, memo, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout, PrivateRoute, Loader } from './components';
import { connect } from 'react-redux';
import { INIT } from './app/main/actionTypes';
import { APP_ROUTES } from './routes';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));

import './styles/main.scss';

const App = ({ isAuthenticated, isAppReady, appInit }) => {
  useEffect(() => {
    appInit();
  }, []);

  return (
    <Layout>
      {isAppReady ? (
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path={APP_ROUTES.AUTH.LOGIN}>
              <Login />
            </Route>
            <PrivateRoute
              path={APP_ROUTES.ROOT}
              component={Home}
              isAuthenticated={isAuthenticated}
            />
          </Switch>
        </Suspense>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated,
  isAppReady: state.main.isAppReady,
});

const mapDispatchToProps = (dispatch) => ({
  appInit: () => dispatch({ type: INIT.REQUEST }),
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default memo(AppContainer);
