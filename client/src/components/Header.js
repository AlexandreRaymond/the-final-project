import { useEffect, useState, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import teamColors from "../utils/backgrounds";
import axios from "axios";
import { InfoContext } from "./InfoContext";

const Header = () => {
  // Logics
  const {
    state: { currentTeam },
    actions: { setCurrentTeam },
  } = useContext(InfoContext);

  console.log("headerteam", currentTeam);
  let color = "black";

  if (currentTeam) {
    color = teamColors[currentTeam.name];
  }
  // On the page
  return (
    <>
      <StyledHeader backgroundColor={color}>
        <StyledNav to="/home" onClick={() => setCurrentTeam(null)}>
          <p>Home</p>
        </StyledNav>
        <StyledNav to="/profile" onClick={() => setCurrentTeam(null)}>
          <p>Profile</p>
        </StyledNav>
        <StyledNav to="/standings" onClick={() => setCurrentTeam(null)}>
          <p>Standings</p>
        </StyledNav>
        <StyledNav to="/teams" onClick={() => setCurrentTeam(null)}>
          <p>Teams</p>
        </StyledNav>
        <StyledNav to="/favourites" onClick={() => setCurrentTeam(null)}>
          <p>Favourites</p>
        </StyledNav>
        <div></div>
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
  width: 100%;
  background-color: ${(props) => props.backgroundColor};
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
