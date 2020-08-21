import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import { connect } from "react-redux";

const Navbar = ({ logout, openLogin, openRegister }) => {
  const handleLogout = e => {
    e.preventDefault();
    logout();
  };

  const guestLinks = (
    <ul>
      <li>
        <button onClick={() => openRegister(true)}>Register</button>
      </li>
      <li>
        <button onClick={() => openLogin(true)}>Login</button>
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
