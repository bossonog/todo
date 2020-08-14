import React, { memo } from 'react';

import './index.scss';

import Nav from './Nav';

const Header = ({ isAuthenticated, onLogoutBtnClick }) => (
  <header className="header">
    <div className="container">
      <Nav isAuthenticated={isAuthenticated} onClick={onLogoutBtnClick} />
      <h1 className="title header-title">todos</h1>
    </div>
  </header>
);

export default memo(Header);
