import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";
import { Wrapper, ButtonContainer, NavBrowse, NavButton } from "./Teams";
import { LogoImg } from "./Roster";
import styled from "styled-components";
import axios from "axios";

const TeamChat = () => {
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
      <>
        <MainContainer>Loading...</MainContainer>
      </>
    );
  }

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
                <NavButton
                  onClick={() => {
                    setCurrentChat(player);
                    setShouldUpdate(true);
                  }}
                >
                  {player.person.fullName}
                </NavButton>
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

export default TeamChat;
