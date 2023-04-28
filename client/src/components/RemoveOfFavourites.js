import { useState, useEffect, useContext } from "react";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const RemoveOfFavourites = ({ favored, setFavored }) => {
  const {
    state: { currentPlayer, currentStats, currentPic },
  } = useContext(InfoContext);

  const { isAuthenticated, user } = useAuth0();

  let preslice = user.sub;
  let userId = preslice.slice(6, preslice.length);

  let playerId = currentPlayer.people[0].id;
  const player = currentPlayer.people[0];
  const stats = currentStats.stats[0].splits[0].stat;

  const toggleLike = (e) => {
    e.preventDefault();
    console.log("banana split", playerId);
    if (favored) {
      axios.patch(`/api/delete/favourites/${userId}`, {
        playerId: playerId,
      });
      console.log("removed?", playerId);
      setFavored(!favored);
    }
  };

  return (
    <>
      <AddFavorites onClick={(e) => toggleLike(e)}>
        <AiFillHeart />
      </AddFavorites>
    </>
  );
};

const AddFavorites = styled.button`
  height: 50px;
  width: 50px;
  font-size: 30px;
  border: none;
  background-color: inherit;
  & :hover {
    cursor: pointer;
    transition: 0.3s;
    scale: 1.15;
  }
`;

export default RemoveOfFavourites;
