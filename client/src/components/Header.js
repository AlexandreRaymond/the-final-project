import { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import teamColors from "../utils/backgrounds";
import axios from "axios";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";
import { ImHome, ImMenu } from "react-icons/im";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { FaHockeyPuck } from "react-icons/fa";

const Header = () => {
  const { user, isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  const {
    state: { currentTeam, yourProfile },
    actions: { setCurrentTeam, setYourProfile },
  } = useContext(InfoContext);

  useEffect(() => {
    if (user) {
      let preslice = user.sub;
      let userId = preslice.slice(6, preslice.length);
      axios.get(`/api/get/profile/${userId}`).then((response) => {
        setYourProfile(response.data.data);
      });
    }
  }, []);

  let color = "black";

  if (currentTeam) {
    color = teamColors[currentTeam.name];
  }
  if (isLoading) {
    return <StyledHeader>Loading...</StyledHeader>;
  }

  return (
    <>
      <StyledHeader backgroundColor={color}>
        <MenuWrapper>
          <span>
            {isAuthenticated ? (
              <StyledNav to="/profile" onClick={() => setCurrentTeam(null)}>
                {yourProfile.picture ? (
                  <ProfileImg src={yourProfile.picture} alt={user.name} />
                ) : (
                  <ProfileImg src={user.picture} alt={user.name} />
                )}
              </StyledNav>
            ) : (
              <StyledNav
                style={{ width: 50, paddingRight: 50 }}
                onClick={() => loginWithRedirect()}
              >
                <p>
                  <FaUserAlt />
                </p>
              </StyledNav>
            )}
          </span>
          <StyledNav
            to="/"
            onClick={() => {
              setCurrentTeam(null);
            }}
          >
            <p>
              <ImHome />
            </p>
          </StyledNav>
          <StyledNav to="/standings" onClick={() => setCurrentTeam(null)}>
            <p>
              <FaHockeyPuck />
            </p>
          </StyledNav>
          <StyledNav to="/teams" onClick={() => setCurrentTeam(null)}>
            <p>
              <RiTeamFill />
            </p>
          </StyledNav>
          <StyledNav to="/chat" onClick={() => setCurrentTeam(null)}>
            <p>
              <BsFillChatLeftDotsFill />
            </p>
          </StyledNav>
        </MenuWrapper>
        <TeamWrapper>
          {currentTeam ? (
            <TeamHeader>
              <div>
                <SSpan>
                  {currentTeam.shortName}
                  <br></br>
                  {currentTeam.teamName}
                </SSpan>
              </div>
              <div>
                <Opacitydiv backgroundColor={color}></Opacitydiv>
                <TeamLogo
                  src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${currentTeam.id}.svg`}
                />
              </div>
            </TeamHeader>
          ) : (
            <TeamHeader>
              <div>
                <SSpan>
                  Hockey<br></br> Dockey
                </SSpan>
              </div>
            </TeamHeader>
          )}
        </TeamWrapper>
      </StyledHeader>
    </>
  );
};

const StyledHeader = styled.div`
  font-family: "Vollkorn", serif;
  position: fixed;
  display: flex;
  flex-direction: row;
  gap: 25px;
  padding-left: 30px;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.backgroundColor};
  height: 100px;
  z-index: 2;
  color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 2px 18px 24px;
  top: 0;
  & p {
    font-size: 25px;
    cursor: pointer;
    line-height: 20px;
    background: ${(props) => props.backgroundColor};
    height: 50px;
    width: 50px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -12%;
    left: 20%;
    border-radius: 100%;
    color: silver;
    transition: 0.5s;
    & a {
      text-decoration: none;
      color: white;
    }
  }
  & p::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: whitesmoke;
    transition: 0.5s;
    transform: scale(0.9);
    z-index: -1;
  }
  & p:hover::before {
    transform: scale(1.1);
    box-shadow: 0 0 15px lightgray;
  }

  & p:hover {
    color: whitesmoke;
    box-shadow: 0 0 5px whitesmoke;
    text-shadow: 0 0 5px whitesmoke;
  }
`;

const StyledNav = styled(NavLink)`
  color: white;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  width: 15%;
  height: 80px;
  text-align: center;
`;

const MenuWrapper = styled.div`
  position: relative;
  height: 80px;
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const TeamWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  width: 55%;
  height: 80px;
`;

const TeamHeader = styled.div`
  position: relative;
  background-color: blue;
  display: flex;
  width: 500px;
  flex-direction: column;
  z-index: 0;
  top: -50%;
  right: 20%;
`;

const TeamLogo = styled.img`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: -10px;
  width: 800px;
  height: 100px;
  z-index: 0;
  object-fit: cover;
`;

const SSpan = styled.span`
  font-family: "Racing Sans One", cursive;
  display: flex;
  font-size: 40px;
  width: 300px;
  z-index: 3;
  position: absolute;
  right: -30%;

  text-shadow: -1px 0 black, 0 5px black, 5px 0 black, 0 -1px black;
`;

const Opacitydiv = styled.div`
  height: 100px;
  width: 800px;
  margin-top: -10px;
  background-color: ${(props) => props.backgroundColor};
  position: absolute;
  opacity: 60%;
  z-index: 2;
`;

const ProfileImg = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 200px;
  border: none;
  box-shadow: rgba(149, 157, 165, 0.2) 2px 18px 24px;
  margin: 15px;
  padding: 2px;
  background-color: white;
  border: 2px solid red;
  position: relative;
  &:hover {
    border: 2px solid limegreen;
  }
`;

export default Header;
