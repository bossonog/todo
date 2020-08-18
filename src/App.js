import React, { useState, useEffect } from 'react';

import './styles/main.scss';

import { Switch, Route } from 'react-router-dom';
import { Layout, PrivateRoute, Loader } from './components';
import { Home, Login } from './pages';
import { AuthenticationContext } from './config';

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
    }, 1500);
  }, [isReady, isAuthenticated]);

  const logout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
  };

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, logout }}>
      <Layout>
        {isReady ? (
          <Switch>
            <Route path={ROUTES.AUTH.LOGIN}>
              <Login login={setIsAuthenticated} />
            </Route>
            <PrivateRoute path={ROUTES.ROOT} component={Home} />
          </Switch>
        ) : (
          <Loader />
        )}
      </Layout>
    </AuthenticationContext.Provider>
  );
};

export default App;
