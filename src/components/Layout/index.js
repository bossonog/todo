import React, { memo } from 'react';

import Header from '../Header';

import './index.scss';

const Layout = ({ children, onLogoutBtnClick, isAuthenticated }) => (
  <>
    <Header onLogoutBtnClick={onLogoutBtnClick} isAuthenticated={isAuthenticated} />
    <main className="main">
      <div className="container">{children}</div>
    </main>
  </>
);

export default memo(Layout);
