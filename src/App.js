import React, { useState, useEffect } from 'react';

import './styles/main.scss';

import { Switch } from 'react-router-dom';
import { Layout, PrivateRoute, PublicRoute } from './components';
import { Home, Login } from './pages';

import ROUTES from './routes';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuthenticated(true);
    }

    setTimeout(() => {
      setIsReady(true);
    }, 3000);
  }, [isReady, isAuthenticated]);

  const logout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
  };

  return (
    <Layout isAuthenticated={isAuthenticated} onLogoutBtnClick={logout}>
      {isReady ? (
        <Switch>
          {/* <Route path={ROUTES.AUTH.LOGIN}>
            <Login authorize={setIsAuthenticated} />
          </Route> */}
          <PublicRoute path={ROUTES.AUTH.LOGIN} component={Login} />
          <PrivateRoute path={ROUTES.ROOT} isAuthenticated={isAuthenticated} component={Home} />
        </Switch>
      ) : (
        'Loading...'
      )}
    </Layout>
  );
};

export default App;
