import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import { connect } from "react-redux";

const Navbar = ({ logout, openLogin, openRegister }) => {
  const [buttonClass, setButtonClass] = useState("btn-primary");
  const [logoClass, setLogoClass] = useState("nav-logo");

  const handleLogout = e => {
    e.preventDefault();
    logout();
  };

  const handleLoginHover = () => {
    if (buttonClass === "btn-primary") setButtonClass("btn-primary-1");
    else if (buttonClass === "btn-primary-1") setButtonClass("btn-primary-2");
    else if (buttonClass === "btn-primary-2") setButtonClass("btn-primary-3");
    else if (buttonClass === "btn-primary-3") setButtonClass("btn-primary");
  };

  const handleLogoHover = () => {
    if (logoClass === "nav-logo") setLogoClass("nav-logo-1");
    else if (logoClass === "nav-logo-1") setLogoClass("nav-logo-2");
    else if (logoClass === "nav-logo-2") setLogoClass("nav-logo-3");
    else if (logoClass === "nav-logo-3") setLogoClass("nav-logo");
  };

  const guestLinks = (
    <ul>
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

  return (
    <nav>
      <a onMouseLeave={handleLogoHover} className={logoClass}>
        Swatched
      </a>
      <div className='nav-buttons-area'>{guestLinks}</div>
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
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
