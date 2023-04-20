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
    state: { currentPlayer, currentStats },
    actions: { setCurrentPlayer, setCurrentStats, setCurrentPic },
  } = useContext(InfoContext);

  console.log("chat current player", currentPlayer);

  useEffect(() => {
    axios.get(`/api/player/${currentPlayer.person.id}`).then((response) => {
      setCurrentPlayer(response.data.player);
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

  return <MainContainer>PlayerChat</MainContainer>;
};

export default PlayerChat;
