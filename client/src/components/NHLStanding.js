import { useState, useEffect, useContext } from "react";
import { MainContainer } from "./Teams";
import { useNavigate } from "react-router-dom";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const NHLStanding = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const {
    state: { currentStanding },
    actions: { setCurrentStanding },
  } = useContext(InfoContext);

  useEffect(() => {
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
      <DivDiv>
        {stand.sort().map((division) => {
          console.log("division", division);
          return (
            <StandingTable>
              <thead>
                <tr>
                  <th>
                    <h2>{division.division.name}</h2>
                  </th>
                  <th>
                    <div>*</div>
                  </th>
                  <th>
                    <div>*</div>
                  </th>
                  <th>GP</th>
                  <th>W</th>
                  <th>L</th>
                  <th>OT</th>
                  <th>PTS</th>
                  <th>P%</th>
                  <th>DIFF</th>
                </tr>
              </thead>

              <tbody>
                {division.teamRecords.sort().map((team) => {
                  console.log("teams", team.team.id);
                  let percentage = team.pointsPercentage.toFixed(3) * 1000;
                  let plusMinus = team.goalsScored - team.goalsAgainst;
                  return (
                    <>
                      <tr>
                        <th>{team.divisionRank}</th>
                        <th>
                          <LogoImg
                            src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${team.team.id}.svg`}
                          />
                        </th>
                        <th>{team.team.name}</th>
                        <th>{team.clinchIndicator}</th>|
                        <th>{team.gamesPlayed}</th> |{" "}
                        <th>{team.leagueRecord.wins}</th> |{" "}
                        <th>{team.leagueRecord.losses}</th> |{" "}
                        <th>{team.leagueRecord.ot}</th> |<th>{team.points}</th>{" "}
                        | <th>.{percentage}</th> |{" "}
                        <th>
                          {plusMinus > 0 && "+"}
                          {plusMinus}
                        </th>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </StandingTable>
          );
        })}
      </DivDiv>
    </MainContainer>
  );
};

const Wrapper = styled.div``;

const DivDiv = styled.div`
  background-color: blue;
  width: 60vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 30px;
`;

const StandingTable = styled.table`
  border-collapse: collapse;
  background-color: green;
  /* margin: 25px 0; */
  min-width: 800px;

  & thead tr {
    background-color: black;
    color: whitesmoke;
    text-align: left;
  }
`;

const LogoImg = styled.img`
  height: 40px;
  width: 40px;
`;

export default NHLStanding;
