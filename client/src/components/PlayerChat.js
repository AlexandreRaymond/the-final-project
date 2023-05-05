import { useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { InfoContext } from "./InfoContext";
import PlayerChatInfos from "./PlayerChatInfos";
import teamColors from "../utils/backgrounds";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { Spinner } from "./Home";

const PlayerChat = () => {
  const SpinnerIcon = withBaseIcon({ size: 50 });
  const {
    state: { currentChat, currentStats, currentPic, currentTeam, currentLogo },
    actions: { setCurrentStats, setCurrentPic },
  } = useContext(InfoContext);

  let color = "black";

  if (currentTeam) {
    color = teamColors[currentTeam.name];
  }

  useEffect(() => {
    if (currentChat) {
      axios.get(`/api/player/${currentChat.person.id}`).then((response) => {
        setCurrentStats(response.data.stats);
        setCurrentPic(response.data.pic);
      });
    }
  }, []);

  if (!currentChat && !currentStats) {
    return (
      <Spinner>
        <SpinnerIcon icon={spinner3} />
      </Spinner>
    );
  }

  return (
    <>
      <MainContainer>
        <LogoImg src={currentLogo} />
        <PlayerDiv backgroundColor={color}>
          <PlayerImg src={currentPic} />
          <p>{currentChat.person.fullName}</p>
        </PlayerDiv>
        <ChatDiv>
          <PlayerChatInfos />
        </ChatDiv>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 95vh;
  margin: 35px auto;
  padding-top: 10px;
  align-items: center;
  justify-content: center;
  font-family: "Racing Sans One", cursive;
  font-size: 25px;
`;

const PlayerDiv = styled.div`
  position: relative;
  background-color: ${(props) => props.backgroundColor};
  color: whitesmoke;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  flex-direction: row;
  height: 80px;
  width: 550px;
  align-items: center;
  justify-content: center;
  font-family: "Vollkorn", serif;
  font-weight: bold;
  font-size: 35px;
  gap: 50px;
  margin: 20px 0;
  z-index: 1;
  & p {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;

const PlayerImg = styled.img`
  border-radius: 100px;
  height: 120px;
  width: auto;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 1;
`;

const ChatDiv = styled.div`
  font-family: "Vollkorn", serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const LogoImg = styled.img`
  height: 90vh;
  width: 90vw;
  position: absolute;
  opacity: 30%;
  margin-top: 50px;
  z-index: 0;
`;

export default PlayerChat;
