import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { Spinner } from "./Home";

const Teams = () => {
  const SpinnerIcon = withBaseIcon({ size: 50 });
  const [teams, setTeams] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  const {
    state: { currentTeam },
    actions: { setCurrentTeam },
  } = useContext(InfoContext);

  useEffect(() => {
    axios.get(`/api/teams`).then((response) => {
      console.log("response", response.data.teams.teams);
      setTeams(response.data.teams.teams);
    });
  }, []);

  if (!teams) {
    return (
      <Spinner>
        <SpinnerIcon icon={spinner3} />
      </Spinner>
    );
  }

  return (
    <MainContainer>
      <h2>Select a team</h2>
      <ButtonContainer>
        {teams.sort().map((team) => {
          return (
            <CardWrapper>
              <NavBrowse to={`/teams/${team.id}/roster`}>
                <CardButton onClick={() => setCurrentTeam(team)}>
                  <TeamLogo
                    src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${team.id}.svg`}
                  />
                  <CardPosition>{team.name}</CardPosition>
                </CardButton>
              </NavBrowse>
            </CardWrapper>
          );
        })}
      </ButtonContainer>
    </MainContainer>
  );
};

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 98%;
  min-height: 100vh;
  margin: 35px auto;
  align-items: center;
  justify-content: center;
  font-family: "Racing Sans One", cursive;
  font-size: 25px;
  z-index: 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  width: 70%;
  height: 700px;
  overflow-y: auto;
  margin: 5px auto;
  gap: 2%;
`;

export const NavButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  height: 70px;
  font-family: "Vollkorn", serif;
  width: 100%;
  transition: all 200ms ease-in-out;
  & span {
    font-size: 25px;
    font-weight: 600;
    font-family: "Vollkorn", serif;
  }

  &:hover {
    scale: 1.1;
  }
`;

export const Wrapper = styled.div`
  width: 18%;
  margin-bottom: 20px;
`;

export const NavBrowse = styled(Link)`
  text-decoration: none;
`;

const ButtonCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 800px;
  width: 85%;
  flex-wrap: wrap;
`;

const CardButton = styled.button`
  z-index: 1;
  font-family: "Racing Sans One", cursive;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 250px;
  transform: perspective(750px) translate3d(0px, 0px, -250px) rotateX(30deg)
    scale(0.9, 0.9);
  border: none;
  /* box-shadow: 0 70px 40px -20px rgba(0, 0, 0, 0.2); */
  transition: 0.4s ease-in-out transform;
  background-color: white;
  &:hover {
    transform: translate3d(0px, 0px, -250px);
    cursor: pointer;
  }
`;

const CardPosition = styled.p`
  margin: -5px;
  width: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 30px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 35px;
  font-family: "Vollkorn", serif;
  font-weight: bold;
`;

const TeamLogo = styled.img`
  position: relative;
  width: 225px;
  height: 225px;
  background-color: transparent;
`;

export default Teams;
