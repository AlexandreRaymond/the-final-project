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
            <Wrapper>
              <div>
                <DivisionName>
                  <h2>{division.division.name}</h2>
                  <div>
                    <span>GP</span>
                    <span>W</span>
                    <span>L</span>
                    <span>OT</span>
                    <span>PTS</span>
                    <span>P%</span>
                    <span>DIFF</span>
                  </div>
                </DivisionName>
                <div>
                  {division.teamRecords.sort().map((team) => {
                    console.log("teams", team.team.id);
                    let percentage = team.pointsPercentage.toFixed(3) * 1000;
                    let plusMinus = team.goalsScored - team.goalsAgainst;
                    return (
                      <>
                        <TeamDiv>
                          <Pee>
                            <span>{team.divisionRank}</span>
                            <LogoImg
                              src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${team.team.id}.svg`}
                            />
                            <div>
                              <span>{team.team.name}</span>{" "}
                            </div>
                            <StatDiv>
                              <span>{team.clinchIndicator}</span> |
                              <span>{team.gamesPlayed}</span> |{" "}
                              <span>{team.leagueRecord.wins}</span> |{" "}
                              <span>{team.leagueRecord.losses}</span> |{" "}
                              <span>{team.leagueRecord.ot}</span> |
                              <span>{team.points}</span> |{" "}
                              <span>.{percentage}</span> |{" "}
                              <span>
                                {plusMinus > 0 && "+"}
                                {plusMinus}
                              </span>
                            </StatDiv>
                          </Pee>
                        </TeamDiv>
                      </>
                    );
                  })}
                </div>
              </div>
            </Wrapper>
          );
        })}
      </DivDiv>
    </MainContainer>
  );
};

const Wrapper = styled.div``;

const DivDiv = styled.div`
  background-color: blue;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 30px;
`;

const DivisionName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 50px;
  width: 1075px;
  color: whitesmoke;
  background-color: black;
  padding-left: 25px;
`;

const TeamDiv = styled.div`
  background-color: green;
  display: flex;
  flex-direction: row;
  width: 1100px;
`;

const Pee = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 1100px;
  font-size: 15px;
  gap: 10px;
  margin-left: 10px;
`;

const StatDiv = styled.div`
  display: flex;
  gap: 25px;
  margin-left: 5%;
`;

const LogoImg = styled.img`
  height: 40px;
  width: 40px;
`;

export default NHLStanding;
