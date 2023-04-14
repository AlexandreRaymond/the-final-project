import { useState } from "react";
import styled from "styled-components";

const Infos = ({ people, statInfo }) => {
  const player = people.people[0];
  const stats = statInfo.stats[0].splits[0].stat;
  console.log("stats", stats);

  return (
    <>
      <InfoDiv>
        <h3>{player.fullName}</h3>
        <p>
          <span>Position: </span>
          {player.primaryPosition.name}
        </p>
        <p>
          <span>Born: </span>
          {player.birthDate}
        </p>
        <p>
          <span>Birthplace: </span>
          {player.birthCity}, {player.birthStateProvince}, {player.birthCountry}
        </p>
        <p>
          <span>Shoots: </span>
          {player.shootsCatches}
        </p>
      </InfoDiv>
    </>
  );
};

const InfoDiv = styled.div`
  font-size: 18px;
  & span {
    font-weight: bold;
    padding-right: 5px;
  }
`;

export default Infos;
