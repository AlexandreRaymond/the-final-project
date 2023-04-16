import { useState } from "react";
import styled from "styled-components";

const PlayerStats = ({ people, statInfo }) => {
  const player = people.people[0];
  const stats = statInfo.stats[0].splits[0].stat;
  console.log("stats", stats);

  return (
    <>
      <SeasonDiv>
        <h3>Regular season</h3>
      </SeasonDiv>
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
    </>
  );
};

const StatDiv = styled.div`
  display: flex;
  flex-direction: row;
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

const SeasonDiv = styled.div`
  position: absolute;
  margin-bottom: 200px;
  font-size: 25px;
`;

export default PlayerStats;
