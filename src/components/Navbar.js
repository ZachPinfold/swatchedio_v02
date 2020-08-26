import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { logout, loadUser } from "../actions/auth";
import { connect } from "react-redux";
import colorHoverChange from "./utils/colorHoverChange";
import { openDiscover, closeDiscover } from "../actions/layout";
import { useHistory } from "react-router";

const Navbar = ({
  logout,
  openLogin,
  openRegister,
  openDiscover,
  closeDiscover,
  layout: { discover },
  auth: { user, isAuthenticated }
}) => {
  const [buttonClass, setButtonClass] = useState("btn-primary");
  const [logoClass, setLogoClass] = useState("nav-logo");

  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === "/") closeDiscover();
  };

  const handleLogout = e => {
    e.preventDefault();
    logout();
  };

  const handleLoginHover = () => {
    const classColor = colorHoverChange(buttonClass, "loginButton");
    setButtonClass(classColor);
  };

  const handleLogoHover = () => {
    const classColor = colorHoverChange(logoClass, "logo");
    setLogoClass(classColor);
  };

  const history = useHistory();

  const guestLinks = (
    <ul>
      {!discover && (
        <li>
          <a className='explore-link' onClick={() => openDiscover()}>
            Discover
          </a>
        </li>
      )}
      <li>
        <a className='register-link' onClick={() => openRegister(true)}>
          Register
        </a>
      </li>
      <li>
        <button
          onMouseLeave={handleLoginHover}
          className={buttonClass}
          onClick={() => openLogin(true)}
        >
          Login
        </button>
      </li>
    </ul>
  );

  const userLinks = (
    <ul>
      {!discover && (
        <li>
          <a className='explore-link' onClick={() => openDiscover()}>
            Discover
          </a>
        </li>
      )}
      <li>
        <Link
          to='/profile'
          onMouseLeave={handleLoginHover}
          className={buttonClass}
        >
          {user}
        </Link>
      </li>
    </ul>
  );

  return (
    <nav>
      <Link
        to='/'
        onMouseLeave={handleLogoHover}
        className={logoClass}
        onClick={handleLogoClick}
      >
        Swatched
      </Link>
      <div className='nav-buttons-area'>
        {!isAuthenticated ? guestLinks : userLinks}
      </div>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </nav>
  );
};

Navbar.prototype = {
  logout: PropTypes.func.isRequired,
  openLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  openRegister: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  layout: state.layout
});

export default connect(mapStateToProps, {
  logout,
  openDiscover,
  closeDiscover
})(Navbar);
