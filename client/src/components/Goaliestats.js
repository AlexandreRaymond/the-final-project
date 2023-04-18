import { useState, useEffect, useContext } from "react";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";

const Goaliestats = () => {
  const {
    state: { currentStats },
  } = useContext(InfoContext);

  //console.log("goalie", currentStats.stats[0].splits[0].stat);
  const stats = currentStats.stats[0].splits[0].stat;
  let gaa = stats.goalAgainstAverage.toFixed(2);
  let saves = stats.savePercentage.toFixed(3);

  // console.log("goalie goalie", saves);

  return (
    <StatDiv>
      <div>
        <p>GP </p>
        <br></br>
        <span>{stats.games}</span>
      </div>
      <div>
        <p>W </p> <br></br>
        <span>{stats.wins}</span>
      </div>
      <div>
        <p>L </p> <br></br>
        <span>{stats.losses}</span>
      </div>
      <div>
        <p>OT </p> <br></br>
        <span> {stats.ot}</span>
      </div>
      <div>
        <p>GAA </p> <br></br>
        <span>{gaa}</span>
      </div>
      <div>
        <p>SV% </p> <br></br>
        <span>{saves}</span>
      </div>
    </StatDiv>
  );
};

const StatDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 45px;
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

export default Goaliestats;
