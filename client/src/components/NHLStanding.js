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

  console.log("standings", standing.data.records);

  if (!standing) {
    return <div>Loading...</div>;
  }

  const stand = standing.data.records;

  return (
    <MainContainer>
      <div>
        <h1>NHL Standing</h1>
      </div>
      <div>
        {stand.sort().map((rank) => {
          return <></>;
        })}
      </div>
    </MainContainer>
  );
};

export default NHLStanding;
