import { useState } from "react";
import styled from "styled-components";

const PlayerStats = ({ people, statInfo }) => {
  const player = people.people[0];
  const stats = statInfo.stats[0].splits[0].stat;
  console.log("stats", stats);

  return (
    <>
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
    </>
  );
};

export default PlayerStats;
