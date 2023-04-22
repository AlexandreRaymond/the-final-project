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
    state: { currentChat, currentStats, currentPic },
    actions: { setCurrentPlayer, setCurrentStats, setCurrentPic },
  } = useContext(InfoContext);

  console.log("chat currentChat", currentChat);

  useEffect(() => {
    axios.get(`/api/player/${currentChat.person.id}`).then((response) => {
      setCurrentStats(response.data.stats);
      setCurrentPic(response.data.pic);
    });
  }, []);

  if (!currentChat && !currentStats) {
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
          <p>{currentChat.person.fullName}</p>
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
  font-family: "Vollkorn", serif;
  font-weight: bold;
  font-size: 25px;
`;

const PlayerImg = styled.img`
  border-radius: 50px;
  height: 100px;
  width: auto;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const ChatDiv = styled.div`
  font-family: "Vollkorn", serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: red;
  width: 90%;
  height: 700px;
  overflow-y: none;
`;

export default PlayerChat;
