import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Player from "./Player";
import Infos from "./Infos";
import { MainContainer } from "./Teams";
import axios from "axios";
import PlayerStats from "./PlayerStats";
import Chat from "./Chat";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GiHockey } from "react-icons/gi";
import teamColors from "../utils/backgrounds";

const PlayerInfos = ({
  people,
  statInfo,
  picture,
  modalOpen,
  setModalOpen,
}) => {
  const player = people.people[0];
  const stats = statInfo.stats[0].splits[0].stat;
  console.log("stats", stats);
  const [currentFocus, setCurrentFocus] = useState("stats");
  const [favored, setFavored] = useState(false);

  const toggleLike = (e) => {
    setFavored(!favored);
  };
  console.log("player", player);

  let information =
    player.primaryPosition.code +
    " | " +
    player.height +
    " | " +
    player.weight +
    " lb | Age: " +
    player.currentAge;

  const color = teamColors[player.currentTeam.name];

  return (
    <MainContainer>
      <PlayerContainer>
        <PlayerDisplay>
          <PlayerImg src={picture} />
          <h1>
            {player.fullName}
            {player.alternateCaptain ? " (A)" : ""}
            {player.captain ? " (C)" : ""} | #{player.primaryNumber}
          </h1>
          <Position>
            <span>{player.primaryPosition.code}</span>
            <span> | </span>
            <span>{player.height}</span>
            <span> | </span>
            <span>{player.weight} lb</span>
            <span> | </span>
            <span>Age: {player.currentAge}</span>
          </Position>
          <TeamDisplay>
            <span>
              <LogoImage
                src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${player.currentTeam.id}.svg`}
              />{" "}
            </span>
            <span>{player.currentTeam.name}</span>
          </TeamDisplay>
        </PlayerDisplay>
        <AddDisplay>
          <AddFavorites onClick={(e) => toggleLike(e)}>
            {favored ? <AiFillHeart /> : <AiOutlineHeart />}
          </AddFavorites>
          <AddToPool onClick={() => window.alert("Soon!")}>
            <GiHockey />
          </AddToPool>
        </AddDisplay>
        <ButtonDisplay>
          <Button
            id="infos"
            backgroundColor={color}
            onClick={() => setCurrentFocus("infos")}
          >
            <ButtonSpan>Infos</ButtonSpan>
          </Button>
          <Button
            autoFocus
            id="stats"
            backgroundColor={color}
            onClick={() => setCurrentFocus("stats")}
          >
            <ButtonSpan>Stats</ButtonSpan>
          </Button>
          <Button
            id="chat"
            backgroundColor={color}
            onClick={() => setCurrentFocus("chat")}
          >
            <ButtonSpan>Chat</ButtonSpan>
          </Button>
        </ButtonDisplay>
        <WhiteFiller></WhiteFiller>
        <SocialDisplay>
          {currentFocus === "infos" && (
            <Infos people={people} statInfo={statInfo} />
          )}
          {currentFocus === "stats" && (
            <PlayerStats people={people} statInfo={statInfo} />
          )}
          {currentFocus === "chat" && (
            <Chat teamName={player.currentTeam.name} />
          )}
        </SocialDisplay>
      </PlayerContainer>
    </MainContainer>
  );
};

const PlayerImg = styled.img`
  border-radius: 100px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  position: inherit;
`;

const ModalContainer = styled.div`
  position: absolute;
  inset: 0;
  background-color: black;
  opacity: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayerContainer = styled.div`
  inset: 0;
  height: 800px;
  width: 550px;
  border-radius: 10px;
  background-color: white;
`;

const PlayerDisplay = styled.div`
  // background-color: green;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamDisplay = styled.div`
  height: 75px;
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: inherit;
  gap: 5px;
  font-size: 18px;
`;

const LogoImage = styled.img`
  height: 45px;
  width: 45px;
`;

const Position = styled.p`
  margin: -10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
`;

const Button = styled.button`
  border: none;
  width: 33%;
  font-weight: bold;
  background-color: inherit;

  &:hover {
    cursor: pointer;
    border-bottom: 3px solid black;
  }
  &:focus {
    color: ${(props) => props.backgroundColor};
    border-bottom: 3px solid ${(props) => props.backgroundColor};
    border-radius: 2px;
  }
`;

const ButtonSpan = styled.span`
  font-weight: bold;
  font-size: 18px;
  transition: 0.5s;
`;

const ButtonDisplay = styled.div`
  // background-color: green;
  width: inherit;
  height: 12px;
  padding-bottom: 8px;
`;

const AddDisplay = styled.div`
  width: inherit;
  height: 100px;
  margin-top: -25px;
  background-color: inherit;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 150px;
`;

const AddFavorites = styled.button`
  height: 50px;
  width: 50px;
  font-size: 30px;
  border: none;
  background-color: inherit;
  & :hover {
    cursor: pointer;
    transition: 0.3s;
    scale: 1.15;
  }
`;

const AddToPool = styled.button`
  height: 50px;
  width: 50px;
  font-size: 30px;
  border: none;
  background-color: inherit;
  & :hover {
    cursor: pointer;
    transition: 0.3s;
    scale: 1.15;
  }
`;

const SocialDisplay = styled.div`
  background-color: whitesmoke;
  width: 530px;
  height: 355px;
  display: flex;
  margin: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  //overflow-y: auto;
`;

const WhiteFiller = styled.div`
  height: 5px;
  background-color: inherit;
`;

export default PlayerInfos;
