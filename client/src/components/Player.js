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
  const [picture, Setpicture] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/player/${id}`).then((response) => {
      console.log("person", response.data.player);
      console.log("stats", response.data.stats);
      setPeople(response.data.player);
      setStatInfo(response.data.stats);
      Setpicture(response.data.pic);
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

/*
  const player = people.people[0];
  //const stats = statInfo.stats[0].splits[0].stat;
  console.log("pic", picture);

  return (
    <MainContainer>
      <div>
        <img src={`${picture}`} />
        <h1>
          {player.fullName}
          {player.alternateCaptain ? " (A)" : ""}
          {player.captain ? " (C)" : ""}
        </h1>
      </div>
    </MainContainer>
  );
};
*/

export default Player;
