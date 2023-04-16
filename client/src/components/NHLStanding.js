import { useState, useEffect } from "react";
import { MainContainer } from "./Teams";
import styled from "styled-components";
import axios from "axios";

const NHLStanding = () => {
  const [standing, setStanding] = useState(null);

  useEffect(() => {
    axios.get(`/api/standings/nhl`).then((response) => {
      setStanding(response.data);
    });
  }, []);

  if (!standing) {
    return <div>Loading...</div>;
  }
  console.log("standings", standing.data.records);

  const stand = standing.data.records;

  return (
    <MainContainer>
      <div>
        <h1>NHL Standing</h1>
      </div>
      <div></div>
    </MainContainer>
  );
};

export default NHLStanding;
