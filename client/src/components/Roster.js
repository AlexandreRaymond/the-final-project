import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Player from "./Player";
import teamColors from "../utils/backgrounds";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { Spinner } from "./Home";

const Roster = () => {
  const SpinnerIcon = withBaseIcon({ size: 50 });
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const [teamName, setTeamName] = useState(null);
  const [playerData, setPlayerData] = useState(null);

  const { id } = useParams();

  const {
    state: { currentLogo, currentRoster, modalOpen },
    actions: {
      setCurrentTeam,
      setCurrentLogo,
      setCurrentRoster,
      setModalOpen,
      setCurrentChat,
    },
  } = useContext(InfoContext);

  const checkModal = () => {
    if (modalOpen) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
    axios.get(`/api/teams/${id}`).then((response) => {
      setTeamName(response.data.team.teams[0].name);
      setModalOpen(false);
      setCurrentTeam(response.data.team.teams[0]);
      setCurrentLogo(response.data.logo);
      setCurrentRoster(response.data.roster);
    });
  }, []);

  if (!currentRoster && !teamName) {
    return (
      <Spinner>
        <SpinnerIcon icon={spinner3} />
      </Spinner>
    );
  }
  const color = teamColors[teamName];

  return (
    <MainContainer backgroundColor={color} onClick={() => checkModal()}>
      <TeamDiv backgroundColor={color}></TeamDiv>
      <LogoImg src={currentLogo} />
      <ButtonContainer>
        {currentRoster.sort().map((player) => {
          return (
            <>
              <RosterButton
                backgroundColor={color}
                onClick={() => {
                  setPlayerData(player);
                  setModalOpen(true);
                  setCurrentChat(player);
                }}
              >
                <CardWrapper>
                  <PlayerImg
                    backgroundColor={color}
                    src={`http://nhl.bamcontent.com/images/headshots/current/168x168/${player.person.id}.jpg`}
                  />
                  <Position>
                    <span>
                      {player.person.fullName}
                      <br></br>#{player.jerseyNumber}
                    </span>
                  </Position>
                </CardWrapper>
              </RosterButton>
            </>
          );
        })}
      </ButtonContainer>
      {modalOpen && playerData && (
        <ModalDiv>
          <ModalInfo onClick={(e) => e.stopPropagation()}>
            <Player player={playerData} />
          </ModalInfo>
        </ModalDiv>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 95vh;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: whitesmoke;
`;

export const TeamDiv = styled.div`
  height: 175px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: whitesmoke;
  position: relative;
  z-index: 1;
  font-size: 30px;
`;

export const LogoImg = styled.img`
  height: 90vh;
  width: 90vw;
  position: absolute;
  opacity: 30%;
  margin-top: 50px;
`;

export const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #00000050;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

export const ModalInfo = styled.div`
  width: 800px;
  height: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  opacity: 1;
  z-index: 1;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 1;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  flex-wrap: wrap;
`;

export const RosterButton = styled.button`
  width: 150px;
  height: 225px;
  transform: perspective(750px) translate3d(0px, 0px, -250px) rotateX(27deg)
    scale(0.75, 0.75);
  border-radius: 20px;
  border: none;
  background-color: transparent;
  transition: 0.4s ease-in-out transform;

  &:hover {
    transform: translate3d(0px, 0px, -250px);
    cursor: pointer;
  }
`;

export const Position = styled.p`
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
  & span {
    font-size: 20px;
  }
`;

export const PlayerImg = styled.img`
  border-radius: 200px;
  box-shadow: 0 70px 40px -20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  position: inherit;
  height: 100px;
  width: 100px;
  border: 5px solid ${(props) => props.backgroundColor};
  background: url(http://goo.gl/vyAs27) no-repeat center;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Vollkorn", serif;
  font-weight: bold;
`;

export default Roster;
