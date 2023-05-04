import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBrowse, NavButton } from "./Teams";
import { LogoImg } from "./Roster";
import styled from "styled-components";
import axios from "axios";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { Spinner } from "./Home";
import teamColors from "../utils/backgrounds";

const TeamChat = () => {
  const SpinnerIcon = withBaseIcon({ size: 50 });
  const navigate = useNavigate();
  const { id } = useParams();
  const [teamName, setTeamName] = useState(null);

  const {
    state: { currentLogo, currentRoster, currentPlayer },
    actions: {
      setCurrentTeam,
      setCurrentLogo,
      setCurrentRoster,
      setCurrentPlayer,
      setCurrentChat,
      setShouldUpdate,
    },
  } = useContext(InfoContext);

  useEffect(() => {
    axios.get(`/api/teams/${id}`).then((response) => {
      //console.log("roster", response.data.roster);
      setTeamName(response.data.team.teams[0].name);
      setCurrentTeam(response.data.team.teams[0]);
      setCurrentLogo(response.data.logo);
      setCurrentRoster(response.data.roster);
    });
  }, []);

  if (!currentRoster && !teamName) {
    return (
      <Spinner>
        <SpinnerIcon icon={spinner3} />
      </Spinner>
    );
  }

  const color = teamColors[teamName];

  return (
    <MainContainer>
      <TeamDiv></TeamDiv>
      <LogoImg src={currentLogo} />
      <ButtonContainer>
        {currentRoster.sort().map((player) => {
          console.log("chat player", player);
          return (
            <Wrapper>
              <NavBrowse to={`/player/${player.person.id}/chat`}>
                <RosterButton
                  backgroundColor={color}
                  onClick={() => {
                    setCurrentChat(player);
                    setShouldUpdate(true);
                  }}
                >
                  <CardWrapper>
                    <PlayerImg
                      src={`http://nhl.bamcontent.com/images/headshots/current/168x168/${player.person.id}.jpg`}
                    />
                    <Position>
                      <span>{player.person.fullName}</span>
                      <span> |</span>
                      <span> {player.position.type}</span>
                      <span> |</span>
                      <span> #{player.jerseyNumber}</span>
                    </Position>
                  </CardWrapper>
                </RosterButton>
              </NavBrowse>
            </Wrapper>
          );
        })}
      </ButtonContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 95vh;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: whitesmoke;
`;

const TeamDiv = styled.div`
  height: 175px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: whitesmoke;
  position: relative;
  z-index: 1;
  font-size: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 1;
`;

const RosterButton = styled.button`
  width: 700px;
  height: 400px;
  transform: perspective(850px) translate3d(0px, 0px, -250px) rotateX(27deg)
    scale(0.9, 0.9);
  border-radius: 20px;
  border: 5px solid ${(props) => props.backgroundColor};
  box-shadow: 0 70px 40px -20px rgba(0, 0, 0, 0.2);
  transition: 0.4s ease-in-out transform;

  &:hover {
    transform: translate3d(0px, 0px, -250px);
    cursor: pointer;
  }
`;

const Position = styled.p`
  margin: -10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
  & span {
    font-size: 30px;
  }
`;

const PlayerImg = styled.img`
  border-radius: 200px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  position: inherit;
  height: 300px;
  width: 300px;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 700px;
  width: 800px;
`;

export default TeamChat;
