import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {
  Wrapper,
  ButtonContainer,
  NavBrowse,
  NavButton,
  MainContainer,
} from "./Teams";
import PlayerInfos from "./PlayerInfos";
import { InfoContext } from "./InfoContext";

const Player = ({ modalOpen, setModalOpen, player }) => {
  const [people, setPeople] = useState(null);
  const [statInfo, setStatInfo] = useState(null);
  const [picture, setPicture] = useState(null);
  console.log("modalplayer", modalOpen);
  const {
    actions: { setCurrentPlayer },
  } = useContext(InfoContext);

  useEffect(() => {
    axios.get(`/api/player/${player.person.id}`).then((response) => {
      setPeople(response.data.player);
      setStatInfo(response.data.stats);
      setPicture(response.data.pic);
      setCurrentPlayer(response.data.player);
    });
  }, []);

  if (!people && !statInfo) {
    return (
      <>
        <MainContainer>Loading...</MainContainer>
      </>
    );
  }

  return (
    <>
      <MainContainer>
        <PlayerInfos
          people={people}
          statInfo={statInfo}
          picture={picture}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
        />
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
