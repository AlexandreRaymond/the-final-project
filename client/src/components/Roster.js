import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Wrapper, ButtonContainer, NavBrowse, NavButton } from "./Teams";

const Roster = () => {
  const [roster, setRoster] = useState(null);
  const [teamName, setTeamName] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/teams/${id}/roster`).then((response) => {
      console.log("roster", response.data.roster);
      setRoster(response.data.roster);
      setTeamName(response.data.team.teams[0].name);
    });
  }, []);

  if (!roster && !teamName) {
    return (
      <>
        <MainContainer>Loading...</MainContainer>
      </>
    );
  }
  return (
    <MainContainer>
      <h1>{teamName}</h1>
      <ButtonContainer>
        {roster.sort().map((players) => {
          return (
            <Wrapper>
              <NavBrowse to={`/player/${players.person.id}`}>
                <NavButton>{players.person.fullName}</NavButton>
              </NavBrowse>
            </Wrapper>
          );
        })}
      </ButtonContainer>
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

export default Roster;
