import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { MainContainer } from "./Teams";
import PlayerInfos from "./PlayerInfos";
import { InfoContext } from "./InfoContext";

const Player = ({ player }) => {
  const {
    state: { currentPlayer, currentStats },
    actions: { setCurrentPlayer, setCurrentStats, setCurrentPic },
  } = useContext(InfoContext);

  useEffect(() => {
    axios.get(`/api/player/${player.person.id}`).then((response) => {
      setCurrentPlayer(response.data.player);
      setCurrentStats(response.data.stats);
      setCurrentPic(response.data.pic);
      console.log("player player player", response.data);
    });
  }, [player]);

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
        <PlayerInfos />
      </MainContainer>
    </>
  );
};

/*
 */

const ModalContainer = styled.div`
  position: absolute;
  inset: 0;
  background-color: black;
  opacity: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Player;
