import React, { useEffect, memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout, PrivateRoute, Loader } from './components';
import { Home, Login } from './pages';
import { connect } from 'react-redux';
import { INIT } from './app/main/actionTypes';

import ROUTES from './routes';

import './styles/main.scss';

const App = ({ isAuthenticated, isAppReady, appInit }) => {
  useEffect(() => {
    appInit();
  }, []);

  return (
    <Layout>
      {isAppReady ? (
        <Switch>
          <Route path={ROUTES.AUTH.LOGIN}>
            <Login />
          </Route>
          <PrivateRoute
            path={ROUTES.ROOT}
            component={Home}
            isAuthenticated={isAuthenticated}
          />
        </Switch>
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
