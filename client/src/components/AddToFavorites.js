import { useContext } from "react";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineHeart } from "react-icons/ai";

const AddToFavorites = ({ favored, setFavored }) => {
  const {
    state: { currentPlayer, currentStats, currentPic },
    actions: { setShowToast },
  } = useContext(InfoContext);
  const { user } = useAuth0();

  let preslice = user.sub;
  let userId = preslice.slice(6, preslice.length);

  let playerId = currentPlayer.people[0].id;
  const player = currentPlayer.people[0];
  const stats = currentStats.stats[0].splits[0].stat;

  const toggleLike = (e) => {
    e.preventDefault();
    if (!favored && player.primaryPosition.type === "Forward") {
      axios.post(`/api/post/add-to-favourites/${userId}`, {
        playerId: playerId,
        favourites: true,
        name: player.fullName,
        team: player.currentTeam.name,
        picture: currentPic,
        jerseyNumber: player.primaryNumber,
        captain: player.captain,
        alternateCaptain: player.alternateCaptain,
        goals: stats.goals,
        assists: stats.assists,
        points: stats.points,
        gp: stats.games,
        plusMinus: stats.plusMinus,
      });
    } else if (!favored && player.primaryPosition.type === "Defenseman") {
      axios.post(`/api/post/add-to-favourites/${userId}`, {
        playerId: playerId,
        favourites: true,
        name: player.fullName,
        team: player.currentTeam.name,
        picture: currentPic,
        jerseyNumber: player.primaryNumber,
        captain: player.captain,
        alternateCaptain: player.alternateCaptain,
        goals: stats.goals,
        assists: stats.assists,
        points: stats.points,
        gp: stats.games,
        plusMinus: stats.plusMinus,
      });
    } else if (!favored && player.primaryPosition.type === "Goalie") {
      let gaa = stats.goalAgainstAverage.toFixed(2);
      axios.post(`/api/post/add-to-favourites/${userId}`, {
        playerId: playerId,
        favourites: true,
        name: player.fullName,
        team: player.currentTeam.name,
        picture: currentPic,
        jerseyNumber: player.primaryNumber,
        captain: player.captain,
        alternateCaptain: player.alternateCaptain,
        wins: stats.wins,
        losses: stats.losses,
        ot: stats.ot,
        gp: stats.games,
        gaa: gaa,
      });
    }
    setShowToast({
      isShowing: true,
      message: `${player.fullName} was added to your favourites!`,
      duration: 3000,
    });
    setFavored(!favored);
  };

  return (
    <>
      <AddFavorites onClick={(e) => toggleLike(e)}>
        <AiOutlineHeart />
      </AddFavorites>
    </>
  );
};

const AddFavorites = styled.button`
  position: relative;
  height: 50px;
  width: 50px;
  font-size: 30px;
  border: none;
  background-color: inherit;
  cursor: pointer;
  & :hover {
    transition-duration: 0.25s;
    color: crimson;
  }
`;

export default AddToFavorites;
