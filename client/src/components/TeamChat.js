import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { InfoContext } from "./InfoContext";
import { NavBrowse } from "./Teams";
import {
  LogoImg,
  TeamDiv,
  Wrapper,
  ButtonContainer,
  RosterButton,
  Position,
  PlayerImg,
  CardWrapper,
} from "./Roster";
import styled from "styled-components";
import axios from "axios";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { Spinner } from "./Home";
import teamColors from "../utils/backgrounds";

const TeamChat = () => {
  const SpinnerIcon = withBaseIcon({ size: 50 });
  const { id } = useParams();
  const [teamName, setTeamName] = useState(null);

  const {
    state: { currentLogo, currentRoster },
    actions: {
      setCurrentTeam,
      setCurrentLogo,
      setCurrentRoster,
      setCurrentChat,
      setShouldUpdate,
    },
  } = useContext(InfoContext);

  useEffect(() => {
    axios.get(`/api/teams/${id}`).then((response) => {
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
                      backgroundColor={color}
                      src={`http://nhl.bamcontent.com/images/headshots/current/168x168/${player.person.id}.jpg`}
                    />
                    <Position>
                      <span>
                        {player.person.fullName}
                        <br></br>#{player.jerseyNumber}
                      </span>
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

export default TeamChat;
