import React from 'react';

import { NavLink } from 'react-router-dom';

const Nav = ({ isAuthenticated, onClick }) => (
  <nav className="header-nav">
    <ul className="header-list">
      <li className="header-item">
        <NavLink to="/" exact className="header-link">Home</NavLink>
      </li>
    </ul>
    {isAuthenticated && <button type="button" className="header-logout" onClick={onClick}>Logout</button>}
  </nav>
);

export default Nav;
