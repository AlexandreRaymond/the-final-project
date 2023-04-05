import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  // Logics

  // On the page
  return (
    <>
      <StyledHeader>
        <StyledNav to="/home">
          <p>Home</p>
        </StyledNav>
        <StyledNav to="/profile">
          <p>Profile</p>
        </StyledNav>
        <StyledNav to="/standings">
          <p>Standings</p>
        </StyledNav>
        <StyledNav to="/teams">
          <p>Teams</p>
        </StyledNav>
        <StyledNav to="/favourites">
          <p>Favourites</p>
        </StyledNav>
      </StyledHeader>
    </>
  );
};

const StyledHeader = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  gap: 25px;
  padding-left: 10px;
  align-items: center;
  width: 100vw;
  background-color: black;
  height: 80px;
  z-index: 2;
  color: white;
  top: 0;
  & p {
    font-size: 25px;
    cursor: pointer;
    & a {
      text-decoration: none;
      color: white;
    }
  }
  & p:after {
    display: block;
    content: "";
    margin-top: 5px;
    border-bottom: solid 3px white;
    transform: scaleX(0);
    transition: transform 500ms ease-in-out;
  }
  & p:hover:after {
    transform: scaleX(1);
  }
`;

const StyledNav = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 20px;
  cursor: pointer;
`;

export default Header;
