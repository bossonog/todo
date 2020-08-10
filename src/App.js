import React from 'react';

import './styles/main.scss';

import { todos } from './constants';

import { Layout, ToDos } from './components';

const App = () => (
  <Layout>
    <ToDos todos={todos} />
  </Layout>
);

export default App;
