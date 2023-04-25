import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";
import { MainContainer } from "./Teams";
import PlayerChatInfos from "./PlayerChatInfos";
import teamColors from "../utils/backgrounds";

const PlayerChat = () => {
  const {
    state: { currentChat, currentStats, currentPic, currentTeam },
    actions: { setCurrentPlayer, setCurrentStats, setCurrentPic },
  } = useContext(InfoContext);

  console.log("chat currentChat", currentChat);

  let color = "black";

  if (currentTeam) {
    color = teamColors[currentTeam.name];
  }

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
  margin-bottom: 20px;
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
`;

const ChatDiv = styled.div`
  font-family: "Vollkorn", serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  max-height: 100%;
`;

export default PlayerChat;
