import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Wrapper, ButtonContainer, NavBrowse, NavButton } from "./Teams";
import Player from "./Player";
import PlayerInfos from "./PlayerInfos";
import teamColors from "../utils/backgrounds";

const Roster = ({ modalOpen, setModalOpen }) => {
  const [roster, setRoster] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const [logo, setLogo] = useState(null);
  const [playerData, setPlayerData] = useState({});
  console.log("modalroster", modalOpen);
  const { id } = useParams();

  const checkModal = () => {
    console.log("banana", checkModal);
    if (modalOpen) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    axios.get(`/api/teams/${id}`).then((response) => {
      console.log("roster", response.data.roster);
      setRoster(response.data.roster);
      setTeamName(response.data.team.teams[0].name);
      setLogo(response.data.logo);
      setModalOpen(false);
    });
  }, []);

  if (!roster && !teamName) {
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
      <LogoImg src={logo} />
      <ButtonContainer>
        {roster.sort().map((player) => {
          console.log("bananaplayer", player);
          return (
            <Wrapper>
              {/* <NavBrowse to={`/player/${players.person.id}`}>
              </NavBrowse> */}
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
          <button onClick={() => setModalOpen(false)}>X</button>
        </ModalDiv>
      )}
    </MainContainer>
  );
};

/*
<NavBrowse to={`/player/${players.person.id}`}>
                <NavButton onClick={() => setModalOpen(true)}>
                  {players.person.fullName}
                </NavButton>
              </NavBrowse>
*/
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${(props) => props.backgroundColor};
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
  width: 500px;
  height: 600px;
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
