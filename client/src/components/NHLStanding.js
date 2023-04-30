import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { InfoContext } from "./InfoContext";
import { MainContainer } from "./Teams";
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
      <TitleDiv>
        <h1>NHL Standing</h1>
      </TitleDiv>
      <DivDiv>
        {stand.sort().map((division) => {
          console.log("division", division);
          return (
            <StandingTable>
              <thead>
                <tr>
                  <THDivisionName colSpan="3">
                    <h2>{division.division.name}</h2>
                  </THDivisionName>
                  <th>
                    <div></div>
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
                        <TDDivisionRank>{team.divisionRank}</TDDivisionRank>
                        <TDLogo>
                          <LogoImg
                            src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${team.team.id}.svg`}
                          />
                        </TDLogo>
                        <TDTeamName>{team.team.name}</TDTeamName>
                        {team.clinchIndicator ? (
                          <TDClinch>
                            <Span>{team.clinchIndicator}</Span>
                          </TDClinch>
                        ) : (
                          <td></td>
                        )}
                        <td>{team.gamesPlayed}</td>{" "}
                        <td>{team.leagueRecord.wins}</td>{" "}
                        <td>{team.leagueRecord.losses}</td>{" "}
                        <td>{team.leagueRecord.ot}</td>
                        <TDPoints>{team.points}</TDPoints>
                        <td>.{percentage}</td>{" "}
                        <td>
                          {plusMinus > 0 && "+"}
                          {plusMinus}
                        </td>
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

const TitleDiv = styled.div`
  margin-top: 50px;
`;

const DivDiv = styled.div`
  background-color: inherit;
  width: 60vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
`;

const StandingTable = styled.table`
  border-collapse: collapse;
  background-color: whitesmoke;
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
  display: inline-block;
  flex-direction: column;
`;

const TDDivisionRank = styled.td`
  width: 5px;
  padding: 10px;
  font-weight: bold;
`;

const THDivisionName = styled.th`
  word-break: break-all;
  min-width: 20px;
  padding-left: 10px;
`;

const TDTeamName = styled.td`
  width: 185px;
  font-weight: bold;
`;

const TDLogo = styled.td`
  width: 50px;
  height: 80px;
  text-align: center;
`;

const TDClinch = styled.td`
  width: 60px;
  text-align: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
`;

const Span = styled.span`
  background-color: lightgray;
  padding: 5px;
  border-radius: 5px;
`;

const TDPoints = styled.td`
  font-weight: bold;
`;

export default NHLStanding;
