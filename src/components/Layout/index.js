import React from 'react';

import Header from '../Header';

const Layout = ({ children }) => (
  <>
    <Header />
    <main className="main">
      <div className="container">{children}</div>
    </main>
  </>
);

export default Layout;
