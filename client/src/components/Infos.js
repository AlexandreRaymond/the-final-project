import { useState } from "react";
import styled from "styled-components";

const Infos = ({ people, statInfo }) => {
  const player = people.people[0];
  const stats = statInfo.stats[0].splits[0].stat;
  console.log("stats", stats);

  return (
    <>
      <div>
        <p>Age: {player.currentAge}</p>
        <p>
          {player.birthCity}, {player.birthCountry}
        </p>
        <p> Born: {player.birthDate}</p>
      </div>
    </>
  );
};

export default Infos;
