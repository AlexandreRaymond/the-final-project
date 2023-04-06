import { useState, useEffect } from "react";
import styled from "styled-components";
import Player from "./Player";
import { MainContainer } from "./Teams";
import axios from "axios";

const PlayerInfos = ({ people, statInfo, picture }) => {
  const player = people.people[0];
  //const stats = statInfo.stats[0].splits[0].stat;
  console.log("pic", picture);

  return (
    <MainContainer>
      <PlayerContainer>
        <PlayerImg src={picture} />
        <h1>
          {player.fullName}
          {player.alternateCaptain ? " (A)" : ""}
          {player.captain ? " (C)" : ""}
        </h1>
      </PlayerContainer>
    </MainContainer>
  );
};

const PlayerImg = styled.img`
  border-radius: 100px;
`;

const PlayerContainer = styled.div`
  background-color: gray;
`;

export default PlayerInfos;
