import { useState, useEffect, useContext } from "react";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";
import SkaterStats from "./SkaterStats";
import Goaliestats from "./Goaliestats";

const PlayerStats = () => {
  const {
    state: { currentPlayer },
  } = useContext(InfoContext);

  const player = currentPlayer.people[0];

  return (
    <>
      <SeasonDiv>
        <h3>Regular season</h3>
      </SeasonDiv>
      <div>
        {player.primaryPosition.type === "Forward" && <SkaterStats />}
        {player.primaryPosition.type === "Defenseman" && <SkaterStats />}
        {player.primaryPosition.type === "Goalie" && <Goaliestats />}
      </div>
    </>
  );
};

const SeasonDiv = styled.div`
  position: absolute;
  margin-bottom: 200px;
  font-size: 25px;
`;

export default PlayerStats;
