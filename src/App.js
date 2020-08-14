import React from 'react';

import './styles/main.scss';

import { Switch, Route } from 'react-router-dom';
import { Layout } from './components';
import { Home, Login } from './pages';

const App = () => (
  <Layout>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Home} />
    </Switch>
  </Layout>
);

export default App;
