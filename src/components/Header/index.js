import React, { memo } from 'react';

import './index.scss';

import Nav from './Nav';

const Header = () => (
  <header className="header">
    <div className="container">
      <Nav />
      <h1 className="title header-title">todos</h1>
    </div>
  </header>
);

export default memo(Header);
