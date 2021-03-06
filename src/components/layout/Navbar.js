import React, { useState, Fragment, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import { colorHoverChange, arrowColorchange } from "../utils/colorHoverChange";
import { openDiscover, closeDiscover } from "../../actions/layout";
import NavDropdown from "./NavDropdown";
import useOnClickOutside from "use-onclickoutside";
import BurgerMenu from "./BurgerMenu";

const Navbar = ({
  logout,
  openLogin,
  openRegister,
  openDiscover,
  closeDiscover,
  layout: { discover, profile },
  auth: { username, isAuthenticated },
  swatch
}) => {
  const [buttonClass, setButtonClass] = useState("btn-primary");
  const [arrowClass, setArrowClass] = useState("#06d6a0");
  const [logoClass, setLogoClass] = useState("nav-logo");
  const [dropDown, setDropDown] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  const closeDeleteBox = event => {
    if (dropDown === true) {
      if (!buttonRef.current.contains(event.target)) setDropDown(false);
    }
  };
  useOnClickOutside(wrapperRef, e => closeDeleteBox(e));

  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === "/") closeDiscover();
  };

  const handleLoginHover = () => {
    const classColor = colorHoverChange(buttonClass, "loginButton");
    setButtonClass(classColor);
  };

  const handleArrowHover = () => {
    const arrowColor = arrowColorchange(arrowClass, "#06d6a0");
    setArrowClass(arrowColor);
  };

  const handleLogoHover = () => {
    const classColor = colorHoverChange(logoClass, "logo");
    setLogoClass(classColor);
  };

  const guestLinks = (
    <ul>
      {!discover && (
        <li>
          <button className='explore-link' onClick={() => openDiscover()}>
            Discover
          </button>
        </li>
      )}
      <li>
        <button className='register-link' onClick={() => openRegister(true)}>
          Register
        </button>
      </li>
      <li>
        <button
          onMouseLeave={(handleLoginHover, () => setArrowClass("#06d6a0"))}
          onMouseEnter={handleArrowHover}
          className={buttonClass}
          onClick={() => openLogin(true)}
        >
          Login
        </button>
      </li>
    </ul>
  );

  const userLinks = (
    <Fragment>
      {isAuthenticated && (
        <ul>
          {!profile && (
            <li>
              <button className='explore-link' onClick={() => openDiscover()}>
                Discover
              </button>
            </li>
          )}
          {!discover && profile && (
            <Link style={{ textDecoration: "none" }} to='/'>
              <p className='explore-link' onClick={() => openDiscover()}>
                Discover
              </p>
            </Link>
          )}
          <li>
            <button
              style={{ position: "relative" }}
              onClick={() => setDropDown(!dropDown)}
              onMouseLeave={(handleLoginHover, () => setArrowClass("#06d6a0"))}
              onMouseEnter={handleArrowHover}
              className={buttonClass}
              ref={buttonRef}
            >
              {username}
              <div className='down-arrow'></div>
            </button>
          </li>
        </ul>
      )}
    </Fragment>
  );

  const userNavLinks = (
    <Fragment>
      {isAuthenticated && (
        <ul>
          {!profile && (
            <li>
              <button
                className='explore-link mobile'
                onClick={() => openDiscover()}
              >
                Discover
              </button>
            </li>
          )}
          {!discover && profile && (
            <Link
              style={{ textDecoration: "none", marginBottom: "10px" }}
              to='/'
            >
              <button
                className='explore-link mobile'
                onClick={() => openDiscover()}
              >
                Discover
              </button>
            </Link>
          )}
          <li>
            <Link className='burger-links mobile' to='/profile'>
              My Swatches
            </Link>
          </li>
          <li
            style={{ marginTop: "5px" }}
            className='secondary-links mobile'
            onClick={() => {
              logout();
              setDropDown(false);
            }}
          >
            Logout
          </li>
        </ul>
      )}
    </Fragment>
  );

  const guestNavLinks = (
    <ul>
      {!discover && (
        <li>
          <button
            className='explore-link mobile'
            onClick={() => openDiscover()}
          >
            Discover
          </button>
        </li>
      )}
      <li>
        <button
          className='register-link mobile'
          onClick={() => openRegister(true)}
        >
          Register
        </button>
      </li>
      <li>
        <button
          onMouseLeave={(handleLoginHover, () => setArrowClass("#06d6a0"))}
          onMouseEnter={handleArrowHover}
          className={buttonClass}
          onClick={() => openLogin(true)}
        >
          Login
        </button>
      </li>
    </ul>
  );

  return (
    <nav
      style={{
        // overflow: "hidden",
        position: swatch.projectPage ? "fixed" : null
      }}
    >
      <Link
        to='/'
        onMouseLeave={handleLogoHover}
        className={logoClass}
        onClick={handleLogoClick}
      >
        Swatched
      </Link>
      <div className='nav-link-area'>
        <div className='nav-buttons-area'>
          {!isAuthenticated ? guestLinks : userLinks}
        </div>
        <div ref={wrapperRef} className='dropdown-container'>
          {dropDown && <NavDropdown setDropDown={setDropDown} />}
        </div>
      </div>
      <div className='burger-area'>
        <BurgerMenu
          isAuthenticated={isAuthenticated}
          authLinks={userLinks}
          guestLinks={guestLinks}
          userNavLinks={userNavLinks}
          guestNavLinks={guestNavLinks}
        />
      </div>
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
  layout: state.layout,
  swatch: state.swatchReducer
});

export default connect(mapStateToProps, {
  logout,
  openDiscover,
  closeDiscover
})(Navbar);
