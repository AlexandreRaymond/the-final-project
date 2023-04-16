import { useState } from "react";
import styled from "styled-components";

const Infos = ({ people, statInfo }) => {
  const player = people.people[0];
  const stats = statInfo.stats[0].splits[0].stat;
  console.log("stats", stats);

  return (
    <>
      <InfoDiv>
        <H3>{player.fullName}</H3>
        <p>
          <Span>Position: </Span>
          {player.primaryPosition.name}
        </p>
        <p>
          <Span>Born: </Span>
          {player.birthDate}
        </p>
        <p>
          <Span>Birthplace: </Span>
          {player.birthCity}, {player.birthStateProvince}, {player.birthCountry}
        </p>
        <p>
          <Span>Shoots: </Span>
          {player.shootsCatches === "L" && <span>Left</span>}
          {player.shootsCatches === "R" && <span>Right</span>}
        </p>
      </InfoDiv>
    </>
  );
};

const InfoDiv = styled.div`
  font-size: 25px;
`;

const H3 = styled.h3`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Span = styled.span`
  font-weight: bold;
  padding-right: 5px;
`;

export default Infos;
