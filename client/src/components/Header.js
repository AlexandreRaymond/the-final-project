import { useEffect, useState, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import teamColors from "../utils/backgrounds";
import axios from "axios";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  // Logics
  const auth = useAuth0();
  console.log("Logged in?", auth.isAuthenticated);
  console.log("banana", auth.user);
  const {
    state: { currentTeam },
    actions: { setCurrentTeam },
  } = useContext(InfoContext);

  let color = "black";

  if (currentTeam) {
    color = teamColors[currentTeam.name];
  }
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }
  // On the page
  return (
    <>
      <StyledHeader backgroundColor={color}>
        <MenuWrapper>
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
          {auth.isAuthenticated ? (
            <p>{auth.user.nickname}</p>
          ) : (
            <StyledNav onClick={() => auth.loginWithRedirect()}>
              <p>Login</p>
            </StyledNav>
          )}
        </MenuWrapper>
        <TeamWrapper>
          {currentTeam && (
            <TeamHeader>
              <span>{currentTeam.name}</span>
              <div>
                <TeamLogo
                  src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${currentTeam.id}.svg`}
                />
              </div>
            </TeamHeader>
          )}
        </TeamWrapper>
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

const MenuWrapper = styled.div`
  position: relative;
  height: 80px;
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 25px;
`;

const TeamWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  width: 55%;
  height: 80px;
  background-color: green;
`;

const TeamHeader = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const TeamLogo = styled.img`
  position: relative;
  width: 50px;
  height: 50px;
  z-index: 0;
`;

export default Header;
