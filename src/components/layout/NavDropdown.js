import React from "react";
import { logout } from "../../actions/auth";
import { Nav } from "aws-amplify-react/lib-esm/AmplifyTheme";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const NavDropdown = ({ logout, setDropDown }) => {
  return (
    <div className='nav-dropdown'>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start"
        }}
      >
        <li>
          <Link
            onClick={() => setDropDown(false)}
            className='link-to-swatch'
            to='/profile'
          >
            My Swatches
          </Link>
        </li>
        <li
          style={{ marginTop: "5px" }}
          className='secondary-links'
          onClick={() => {
            logout();
            setDropDown(false);
          }}
        >
          Logout
        </li>
        <li className='secondary-links'>Change password</li>
      </ul>
    </div>
  );
};

export default connect(null, {
  logout
})(NavDropdown);
