import { useState, useEffect } from "react";
import styled from "styled-components";
import Player from "./Player";
import { MainContainer } from "./Teams";
import axios from "axios";
import PlayerStats from "./PlayerStats";
import Chat from "./Chat";

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

  return (
    <MainContainer>
      <PlayerContainer>
        <PlayerDisplay>
          <PlayerImg src={picture} />
          <h1>
            {player.fullName}
            {player.alternateCaptain ? " (A)" : ""}
            {player.captain ? " (C)" : ""}
          </h1>
        </PlayerDisplay>
        <ButtonDisplay>
          <Button autoFocus id="stats" onClick={() => setCurrentFocus("stats")}>
            Stats
          </Button>
          <Button id="chat" onClick={() => setCurrentFocus("chat")}>
            Chat
          </Button>
        </ButtonDisplay>
        <SocialDisplay>
          {currentFocus === "stats" && (
            <PlayerStats people={people} statInfo={statInfo} />
          )}
          {currentFocus === "chat" && <Chat />}
        </SocialDisplay>
      </PlayerContainer>
    </MainContainer>
  );
};

const PlayerImg = styled.img`
  border-radius: 100px;
  background-color: green;
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
  opacity: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayerContainer = styled.div`
  inset: 0;
  height: 600px;
  width: 500px;
  border-radius: 10px;
  background-color: whitesmoke;
`;

const PlayerDisplay = styled.div`
  // background-color: green;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  width: 50%;
  font-weight: bold;
  background-color: inherit;

  &:hover {
    cursor: pointer;
    transition: 0.1s;
    border-bottom: 2px solid black;
  }
  &:focus {
    transition: 0.1s;
    color: red;
    border-bottom: 3px solid red;
    border-radius: 2px;
  }
`;

const ButtonDisplay = styled.div`
  // background-color: green;
  width: inherit;
  height: 12px;
  padding-bottom: 8px;
`;

const SocialDisplay = styled.div`
  //background-color: blue;
  width: inherit;
  height: 125px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default PlayerInfos;
