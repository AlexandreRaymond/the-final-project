import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Wrapper, ButtonContainer, NavBrowse, NavButton } from "./Teams";
import ModalPlayer from "./ModalPlayer";
import Player from "./Player";

const Roster = ({ modalOpen, setModalOpen }) => {
  const [roster, setRoster] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const [logo, setLogo] = useState(null);
  console.log("modalroster", modalOpen);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/teams/${id}`).then((response) => {
      console.log("roster", response.data.roster);
      setRoster(response.data.roster);
      setTeamName(response.data.team.teams[0].name);
      setLogo(response.data.logo);
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
      <LogoImg src={logo} />
      <h1>{teamName}</h1>
      <ButtonContainer>
        {roster.sort().map((players) => {
          return (
            <Wrapper>
              <NavButton onClick={() => setModalOpen(true)}>
                {players.person.fullName}
              </NavButton>
              {modalOpen && <Player />}
            </Wrapper>
          );
        })}
      </ButtonContainer>
    </MainContainer>
  );
};

/*
<NavBrowse to={`/player/${players.person.id}`}>
                <NavButton onClick={() => setModalOpen(true)}>
                  {players.person.fullName}
                </NavButton>
              </NavBrowse>
*/
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

const LogoImg = styled.img`
  height: 100px;
  width: 100px;
  margin: -25px 0;
`;

export default Roster;
