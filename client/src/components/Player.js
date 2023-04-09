import { useState, useEffect } from "react";
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
import ModalPlayer from "./ModalPlayer";

const Player = ({ modalOpen, setModalOpen }) => {
  const [people, setPeople] = useState(null);
  const [statInfo, setStatInfo] = useState(null);
  const [picture, setPicture] = useState(null);
  console.log("modalplayer", modalOpen);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/player/${id}`).then((response) => {
      setPeople(response.data.player);
      setStatInfo(response.data.stats);
      setPicture(response.data.pic);
    });
  }, [id]);

  if (!people && !statInfo) {
    return (
      <>
        <MainContainer>Loading...</MainContainer>
      </>
    );
  }

  return (
    <>
      <PlayerInfos
        people={people}
        statInfo={statInfo}
        picture={picture}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
    </>
  );
};

export default Player;
