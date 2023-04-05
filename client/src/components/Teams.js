import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Teams = () => {
  const [teams, setTeams] = useState(null);

  useEffect(() => {
    axios.get(`/api/teams`).then((response) => {
      console.log("response", response.data.teams.teams);
      setTeams(response.data.teams.teams);
    });
  }, []);

  if (!teams) {
    return (
      <>
        <MainContainer>Loading...</MainContainer>
      </>
    );
  }

  return (
    <MainContainer>
      <h1>Select a team</h1>
      <ButtonContainer>
        {teams.sort().map((team) => {
          return (
            <Wrapper>
              <NavBrowse to={`/teams/${team.id}/roster`}>
                <NavButton>{team.name}</NavButton>
              </NavBrowse>
            </Wrapper>
          );
        })}
      </ButtonContainer>
    </MainContainer>
  );
};

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 90vh;
  margin: 35px auto;
  margin-top: 80px;
  align-items: center;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  width: 70%;
  margin: 5px auto;
  gap: 2%;
`;

export const NavButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  height: 70px;

  width: 100%;
  transition: all 200ms ease-in-out;
  & span {
    font-size: 25px;
    font-weight: 600;
    font-family: "Raleway", sans-serif;
  }

  &:hover {
    scale: 1.1;
  }
`;

export const Wrapper = styled.div`
  width: 18%;
  margin-bottom: 20px;
`;

export const NavBrowse = styled(Link)`
  text-decoration: none;
`;

export default Teams;
