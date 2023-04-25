import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { InfoContext } from "./InfoContext";

const Footer = () => {
  return (
    <FootDiv>
      <p>
        NHL and the NHL Shield are registered trademarks of the National Hockey
        League. NHL and NHL team marks are the property of the NHL and its
        teams. © NHL 2023. All Rights Reserved.
      </p>
    </FootDiv>
  );
};

const FootDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100avw;
  font-size: 10px;
  background-color: black;
  color: lightgray;
`;

export default Footer;
