import { useState, useContext, useEffect } from "react";
import { User, useAuth0 } from "@auth0/auth0-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";
import axios from "axios";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { Spinner } from "./Home";
import {
  MainContainer,
  ButtonContainer,
  NavButton,
  NavBrowse,
  Wrapper,
} from "./Teams";

const ChatMenu = () => {
  const SpinnerIcon = withBaseIcon({ size: 50 });
  const { isAuthenticated } = useAuth0();

  const [teams, setTeams] = useState(null);

  useEffect(() => {
    axios.get(`/api/teams`).then((response) => {
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
      <h1>Filter through a team</h1>
      <ButtonContainer>
        {teams.sort().map((team) => {
          return (
            <CardWrapper>
              <NavBrowse to={`/teams/${team.id}/roster`}>
                <CardButton>
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
  transform: perspective(750px) translate3d(0px, 0px, -250px) rotateX(27deg)
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
  /* gap: 35px; */
  font-family: "Vollkorn", serif;
  font-weight: bold;
`;

const TeamLogo = styled.img`
  width: 225px;
  height: 225px;
  background-color: transparent;
`;

export default ChatMenu;
