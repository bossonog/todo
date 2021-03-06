import React, { memo } from 'react';

import Header from '../Header';

import './index.scss';

const Layout = ({ children }) => (
  <>
    <Header />
    <main className="main">
      <div className="container">{children}</div>
    </main>
  </>
);

export default memo(Layout);
