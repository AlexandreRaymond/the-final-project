import { useState } from "react";
import styled from "styled-components";
import Player from "./Player";
import { MainContainer } from "./Teams";

const PlayerInfos = ({ people, statInfo, picture }) => {
  const player = people.people[0];
  //const stats = statInfo.stats[0].splits[0].stat;
  console.log("pic", picture);

  return (
    <MainContainer>
      <div>
        <img src={`${picture}`} />
        <h1>
          {player.fullName}
          {player.alternateCaptain ? " (A)" : ""}
          {player.captain ? " (C)" : ""}
        </h1>
      </div>
    </MainContainer>
  );
};

export default PlayerInfos;
