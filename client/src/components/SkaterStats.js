import { useState, useEffect, useContext } from "react";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";

const SkaterStats = () => {
  const {
    state: { currentStats },
  } = useContext(InfoContext);

  //console.log("Skater", currentStats.stats[0].splits[0].stat);
  const stats = currentStats.stats[0].splits[0].stat;

  return (
    <StatDiv>
      <div>
        <p>GP </p>
        <br></br>
        <span>{stats.games}</span>
      </div>
      <div>
        <p>G </p> <br></br>
        <span>{stats.goals}</span>
      </div>
      <div>
        <p>A </p> <br></br>
        <span>{stats.assists}</span>
      </div>
      <div>
        <p>P </p> <br></br>
        <span>{stats.points}</span>
      </div>
      <div>
        <p>+/- </p> <br></br>
        <span>{stats.plusMinus}</span>
      </div>
    </StatDiv>
  );
};

const StatDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 80px;
  font-size: 25px;
  margin-top: 10px;
  padding-bottom: 10px;
  background-color: inherit;
  border-radius: 5px;
  & p {
    color: grey;
    margin: 0;
  }
`;

export default SkaterStats;
