import React from "react";

export default function NavDropdown() {
  return (
    <div className='nav-dropdown'>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start"
        }}
      >
        <li>Swatches</li>
        <li>Logout</li>
        <li>Change password</li>
      </ul>
    </div>
  );
}
