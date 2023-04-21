import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";
import { MainContainer } from "./Teams";
import PlayerChatInfos from "./PlayerChatInfos";

const PlayerChat = () => {
  const {
    state: { currentPlayer, currentStats, currentPic },
    actions: { setCurrentPlayer, setCurrentStats, setCurrentPic },
  } = useContext(InfoContext);

  console.log("chat current player", currentPlayer);

  useEffect(() => {
    axios.get(`/api/player/${currentPlayer.person.id}`).then((response) => {
      setCurrentStats(response.data.stats);
      setCurrentPic(response.data.pic);
    });
  }, []);

  if (!currentPlayer && !currentStats) {
    return (
      <>
        <MainContainer>Loading...</MainContainer>
      </>
    );
  }

  return (
    <>
      <MainContainer>
        <PlayerDiv>
          <PlayerImg src={currentPic} />
          <p>{currentPlayer.person.fullName}</p>
        </PlayerDiv>
        <ChatDiv>
          <PlayerChatInfos />
        </ChatDiv>
      </MainContainer>
    </>
  );
};

const PlayerDiv = styled.div`
  position: inherit;
  background-color: lightblue;
  display: flex;
  flex-direction: row;
  width: 90%;
  align-items: center;
  justify-content: space-between;
`;

const PlayerImg = styled.img`
  border-radius: 50px;
  height: 100px;
  width: auto;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const ChatDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: red;
  width: 90%;
  height: 650px;
  overflow-y: none;
`;

export default PlayerChat;
