import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Wrapper,
  ButtonContainer,
  NavBrowse,
  NavButton,
  MainContainer,
} from "./Teams";
import { ModalInfo, ModalDiv, LogoImg, TeamDiv } from "./Roster";
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
      <TeamDiv>
        <h1>{teamName}</h1>
      </TeamDiv>
      <LogoImg src={currentLogo} />
      <ButtonContainer>
        {currentRoster.sort().map((player) => {
          console.log("chat player", player);
          return (
            <Wrapper>
              <NavBrowse to={`/player/${player.person.id}/chat`}>
                <NavButton onClick={() => setCurrentPlayer(player)}>
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

export default TeamChat;
