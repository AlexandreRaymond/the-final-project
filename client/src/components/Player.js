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

const Player = () => {
  const [people, setPeople] = useState(null);
  const [statInfo, setStatInfo] = useState(null);
  const [picture, setPicture] = useState(null);

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
      <PlayerInfos people={people} statInfo={statInfo} picture={picture} />
    </>
  );
};

export default Player;
