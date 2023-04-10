import { useState, useEffect } from "react";
import styled from "styled-components";
import Player from "./Player";
import { MainContainer } from "./Teams";
import axios from "axios";

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

  return (
    <MainContainer>
      <PlayerContainer>
        <PlayerImg src={picture} />
        <h1>
          {player.fullName}
          {player.alternateCaptain ? " (A)" : ""}
          {player.captain ? " (C)" : ""}
        </h1>
        <div>
          <p>
            GP : <span>{stats.games}</span>
          </p>
          <p>
            Goals : <span>{stats.goals}</span>
          </p>
          <p>
            Assists : <span>{stats.assists}</span>
          </p>
          <p>
            Points : <span>{stats.points}</span>
          </p>
          <p>
            +/- : <span>{stats.plusMinus}</span>
          </p>
          <p>
            PIM : <span>{stats.goals}</span>
          </p>
        </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 400px;
  width: 300px;
  border-radius: 10px;
  background-color: whitesmoke;
`;

export default PlayerInfos;
