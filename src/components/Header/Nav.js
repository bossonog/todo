import React, { useContext, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '../';
import { LOGOUT } from '../../app/authentication/actionTypes';

const Nav = ({ isAuthenticated, logout }) => {
  const onLogoutBtnClick = () => logout();

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
        <Button type="button" className="header-logout" onClick={onLogoutBtnClick} title="Logout" />
      )}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch({ type: LOGOUT.REQUEST }),
});

const NavContainer = connect(mapStateToProps, mapDispatchToProps)(Nav);

export default memo(NavContainer);
