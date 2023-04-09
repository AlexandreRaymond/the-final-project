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
import Player from "./Player";

const ModalPlayer = () => {
  return (
    <MainContainer>
      <ModalContainer>
        <Player />
      </ModalContainer>
    </MainContainer>
  );
};

const ModalContainer = styled.div`
  position: absolute;
  inset: 0;
  background-color: black;
  opacity: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ModalPlayer;
