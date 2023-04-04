import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Players = () => {
  const [roster, setRoster] = useState(null);

  useEffect(() => {
    axios.get("https://statsapi.web.nhl.com/api/v1/teams").then((response) => {
      console.log("response", response.data.teams);
      setRoster(response.data.teams);
    });
  }, []);

  if (!roster) {
    return (
      <>
        <MainContainer>Loading...</MainContainer>
      </>
    );
  }

  return (
    <MainContainer>
      <h1>Select a team</h1>
      {roster.sort().map((team) => {
        return <div>{team.name}</div>;
      })}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 90vh;
  margin: 35px auto;
  margin-top: 80px;
  align-items: center;
  justify-content: center;
`;

export default Players;
