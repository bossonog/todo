import React from 'react';

import './styles/main.scss';

import { Layout } from './components/Layout';
import { ToDos } from './components/ToDos';

const App = () => (
  <Layout>
    <ToDos />
  </Layout>
);

export default App;
