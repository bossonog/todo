import React, { useState, useEffect } from 'react';

import './styles/main.scss';

import { Switch, Route } from 'react-router-dom';
import { Layout, PrivateRoute } from './components';
import { Home, Login } from './pages';
import ROUTES from './routes';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  const logout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
  };

  return (
    <Layout isAuthenticated={isAuthenticated} onLogoutBtnClick={logout}>
      <Switch>
        <Route path={ROUTES.AUTH.LOGIN}>
          <Login authorize={setIsAuthenticated} />
        </Route>
        <PrivateRoute path={ROUTES.ROOT} isAuthenticated={isAuthenticated} component={Home} />
      </Switch>
    </Layout>
  );
};

export default App;
