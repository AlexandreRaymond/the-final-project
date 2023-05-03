import React from "react";
import { useState } from "react";
import styled from "styled-components";
import HDImg01 from "../utils/HDImg01.jpg";
import HDImg02 from "../utils/HDImg02.jpg";
import HDImg03 from "../utils/HDImg03.jpg";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const HeroDisplay = () => {
  const [heroImageState, setHeroImageState] = useState(0);
  const clickHeroArrow = () => {
    if (heroImageState === 2) {
      setHeroImageState(0);
    } else {
      setHeroImageState(heroImageState + 1);
    }
  };
  return (
    <HeroMainContainer heroImageState={heroImageState}>
      <SlArrowLeft
        size={150}
        color="white"
        onClick={() => clickHeroArrow()}
        style={{ cursor: "pointer" }}
      />
      <SlArrowRight
        size={150}
        color="white"
        onClick={() => clickHeroArrow()}
        style={{ cursor: "pointer" }}
      />
      <InfoDiv></InfoDiv>
      {heroImageState === 1 && (
        <TextDiv>
          <TitleDiv>Track your favourites of any NHL team!</TitleDiv>
          <SubTittleDiv>
            With the "Add to Favourites" option in a player's card, you can
            easily follow them!
          </SubTittleDiv>
        </TextDiv>
      )}
      {heroImageState === 0 && (
        <TextDiv>
          <TitleDiv>Signup for a glimps of what's new in the NHL</TitleDiv>
          <SubTittleDiv>
            With access to the NHL season standing, players' information and
            stats and a home feed to let you know the latest!
          </SubTittleDiv>
        </TextDiv>
      )}
      {heroImageState === 2 && (
        <TextDiv>
          <TitleDiv>Have an opinion to share about a player?</TitleDiv>
          <SubTittleDiv>
            Let us know in the chat section and find friends to share it with!
          </SubTittleDiv>
        </TextDiv>
      )}
    </HeroMainContainer>
  );
};

const HeroMainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px auto;
  width: 100%;
  height: 50vh;
  margin-top: 100px;
  background-image: ${(props) =>
    props.heroImageState === 0
      ? `url(${HDImg01})`
      : props.heroImageState === 1
      ? `url(${HDImg02})`
      : `url(${HDImg03})`};
  background-size: cover;
  background-position: center;
  box-shadow: rgba(149, 157, 165, 0.2) 2px 18px 24px;
`;

const InfoDiv = styled.div`
  position: absolute;
  background-color: black;
  width: 100%;
  height: 150px;
  opacity: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  top: 32.2%;
`;

const TextDiv = styled.div`
  position: absolute;
  top: 33%;
  color: whitesmoke;
  z-index: 1;
`;

const TitleDiv = styled.div`
  margin-left: 40px;
  font-family: "Racing Sans One", cursive;
  font-weight: bold;
  font-size: 55px;
`;

const SubTittleDiv = styled.div`
  margin-left: 90px;
  margin-top: 20px;
  font-family: "Vollkorn", serif;
  font-size: 22px;
`;

export default HeroDisplay;
