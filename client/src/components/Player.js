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

const Player = () => {
  const [people, setPeople] = useState(null);
  const [statInfo, setStatInfo] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/player/${id}`).then((response) => {
      console.log("person", response.data.player);
      console.log("stats", response.data.stats);
      setPeople(response.data.player);
      setStatInfo(response.data.stats);
    });
  }, []);

  if (!people && !statInfo) {
    return (
      <>
        <MainContainer>Loading...</MainContainer>
      </>
    );
  }
  const player = people.people[0];
  const stats = statInfo.stats[0].splits[0].stat;
  console.log("hello", stats);

  return (
    <MainContainer>
      <div>
        <h1>
          {player.fullName}
          {player.alternateCaptain ? " (A)" : ""}
          {player.captain ? " (C)" : ""}
        </h1>
        <div>Goals : {stats.goals}</div>
        <div>Assists : {stats.assists}</div>
        <div>Points : {stats.points}</div>
      </div>
    </MainContainer>
  );
};

export default Player;
