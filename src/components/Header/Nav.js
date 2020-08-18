import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import { AuthenticationContext } from '../../config';

const Nav = () => {
  const { isAuthenticated, logout } = useContext(AuthenticationContext);

  return (
    <nav className="header-nav">
      <ul className="header-list">
        <li className="header-item">
          <NavLink to="/" exact className="header-link">
            Home
          </NavLink>
        </li>
      </ul>
      {isAuthenticated && (
        <button type="button" className="header-logout" onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Nav;
