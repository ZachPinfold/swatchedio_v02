import React from "react";
import styled from "styled-components";

const Ul = styled.ul`
  padding-top: 20px;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  opacity: 0.9;
  padding: 0px;
  li {
    padding: 10px 10px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0d2538;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
    ul {
      list-style: none;
      display: flex;
      flex-flow: column nowrap;
      padding: 0px;
    }
  }
`;

const RightNav = ({
  open,
  authLinks,
  loading,
  guestLinks,
  isAuthenticated,
  userNavLinks,
  guestNavLinks,
  setOpen
}) => {
  return (
    !loading && (
      <Ul open={open}>{isAuthenticated ? userNavLinks : guestNavLinks} </Ul>
    )
  );
};

export default RightNav;
