import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import { connect } from "react-redux";

const Navbar = ({ logout, openLogin, openRegister }) => {
  const [buttonClass, setButtonClass] = useState("btn-primary");

  const handleLogout = e => {
    e.preventDefault();
    logout();
  };

  const handleHover = () => {
    if (buttonClass === "btn-primary") setButtonClass("btn-primary-1");
    else if (buttonClass === "btn-primary-1") setButtonClass("btn-primary-2");
    else if (buttonClass === "btn-primary-2") setButtonClass("btn-primary-3");
    else if (buttonClass === "btn-primary-3") setButtonClass("btn-primary");
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
          onMouseLeave={handleHover}
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
      <div className='nav-logo-area'>Logo</div>
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
