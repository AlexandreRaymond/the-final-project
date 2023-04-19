import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Wrapper, ButtonContainer, NavBrowse, NavButton } from "./Teams";
import Player from "./Player";
import PlayerInfos from "./PlayerInfos";
import teamColors from "../utils/backgrounds";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";

const Roster = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const [roster, setRoster] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const [logo, setLogo] = useState(null);
  const [playerData, setPlayerData] = useState({});

  const { id } = useParams();

  const {
    state: { currentLogo, currentRoster, modalOpen },
    actions: { setCurrentTeam, setCurrentLogo, setCurrentRoster, setModalOpen },
  } = useContext(InfoContext);

  const checkModal = () => {
    if (modalOpen) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
    axios.get(`/api/teams/${id}`).then((response) => {
      //console.log("roster", response.data.roster);
      setRoster(response.data.roster);
      setTeamName(response.data.team.teams[0].name);
      setLogo(response.data.logo);
      setModalOpen(false);
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
  const color = teamColors[teamName];
  console.log("team name", teamName, teamColors, color);

  return (
    <MainContainer backgroundColor={color} onClick={() => checkModal()}>
      <TeamDiv backgroundColor={color}>
        <h1>{teamName}</h1>
      </TeamDiv>
      <LogoImg src={currentLogo} />
      <ButtonContainer>
        {currentRoster.sort().map((player) => {
          return (
            <Wrapper>
              <NavButton
                onClick={() => {
                  setPlayerData(player);
                  setModalOpen(true);
                }}
              >
                {player.person.fullName}
              </NavButton>
            </Wrapper>
          );
        })}
      </ButtonContainer>
      {modalOpen && (
        <ModalDiv>
          <ModalInfo onClick={(e) => e.stopPropagation()}>
            <Player player={playerData} />
          </ModalInfo>
        </ModalDiv>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: whitesmoke// ${(props) => props.backgroundColor};
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

const LogoImg = styled.img`
  height: 80vh;
  width: 80vw;
  position: absolute;
  opacity: 69%;
  margin-top: 50px;
`;

const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #00000050;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const ModalInfo = styled.div`
  width: 800px;
  height: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  opacity: 1;
  z-index: 1;
`;

export default Roster;
