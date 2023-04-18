import { useState, useEffect, useContext } from "react";
import { MainContainer } from "./Teams";
import { useNavigate } from "react-router-dom";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";
import axios from "axios";

const NHLStanding = () => {
  const navigate = useNavigate();
  const {
    state: { logged, currentStanding },
    actions: { setLogged, setCurrentStanding },
  } = useContext(InfoContext);
  console.log("Standing log", logged);

  useEffect(() => {
    if (!logged) {
      return navigate("/");
    }
    axios.get(`/api/standings/nhl`).then((response) => {
      setCurrentStanding(response.data);
    });
  }, []);

  if (!currentStanding) {
    return <div>Loading...</div>;
  }
  console.log("standings", currentStanding.data.records);

  const stand = currentStanding.data.records;

  return (
    <MainContainer>
      <div>
        <h1>NHL Standing</h1>
      </div>
      <div>
        {stand.sort().map((division) => {
          <div>
            {division.teamRecords.sort().map((team) => {
              return (
                <>
                  <Pee>
                    {team.leagueRank} - {team.team.name}
                  </Pee>
                </>
              );
            })}
          </div>;
        })}
      </div>
    </MainContainer>
  );
};

const Pee = styled.p`
  font-size: 10px;
`;

export default NHLStanding;
