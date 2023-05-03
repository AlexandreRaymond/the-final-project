import { useState, useEffect, useContext } from "react";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";
import Infos from "./Infos";
import { MainContainer } from "./Teams";
import axios from "axios";
import PlayerStats from "./PlayerStats";
import Chat from "./Chat";
import { GiHockey } from "react-icons/gi";
import teamColors from "../utils/backgrounds";
import AddToFavorites from "./AddToFavorites";
import RemoveOfFavourites from "./RemoveOfFavourites";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";

const PlayerInfos = () => {
  const {
    state: { currentPlayer, currentStats, currentPic, currentFocus },
    actions: { setCurrentFocus },
  } = useContext(InfoContext);

  const { isAuthenticated, user } = useAuth0();

  let preslice = user.sub;
  let userId = preslice.slice(6, preslice.length);

  const [favored, setFavored] = useState(null);
  const player = currentPlayer.people[0];

  useEffect(() => {
    axios.get(`/api/get/favourites/${userId}`).then((response) => {
      console.log("favourite answer", response.data.data);
      setFavored(
        !!response.data.data.find((fplayer) => {
          return fplayer.playerId === player.id;
        })
      );
    });
  }, [player.id, userId]);

  const stats = currentStats?.stats[0]?.splits[0]?.stat;
  console.log("stats", stats);

  console.log("playerinfo", currentPlayer);
  console.log("Liked?", favored);
  console.log("photo", currentPic);

  const color = teamColors[player.currentTeam.name];

  return (
    <MainContainer>
      <PlayerContainer>
        <PlayerDisplay>
          <PlayerImg src={currentPic} />
          <h1>
            {player.fullName}
            {player.alternateCaptain ? " (A)" : ""}
            {player.captain ? " (C)" : ""} | #{player.primaryNumber}
          </h1>
          <Position>
            <span>{player.primaryPosition.code}</span>
            <span> | </span>
            <span>{player.height}</span>
            <span> | </span>
            <span>{player.weight} lb</span>
            <span> | </span>
            <span>Age: {player.currentAge}</span>
          </Position>
          <TeamDisplay>
            <span>
              <LogoImage
                src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${player.currentTeam.id}.svg`}
              />{" "}
            </span>
            <span>{player.currentTeam.name}</span>
          </TeamDisplay>
        </PlayerDisplay>
        <AddDisplay>
          <LikeDiv>
            {favored ? (
              <RemoveOfFavourites favored={favored} setFavored={setFavored} />
            ) : (
              <AddToFavorites favored={favored} setFavored={setFavored} />
            )}
          </LikeDiv>
          <div>
            <AddToPool onClick={() => window.alert("Soon!")}>
              <GiHockey />
            </AddToPool>
          </div>
        </AddDisplay>
        <ButtonDisplay>
          <Button
            id="infos"
            backgroundColor={color}
            onClick={() => setCurrentFocus("infos")}
          >
            <ButtonSpan>Infos</ButtonSpan>
          </Button>
          <Button
            autoFocus
            id="stats"
            backgroundColor={color}
            onClick={() => setCurrentFocus("stats")}
          >
            <ButtonSpan>Stats</ButtonSpan>
          </Button>
          <Button
            id="chat"
            backgroundColor={color}
            onClick={() => setCurrentFocus("chat")}
          >
            <ButtonSpan>Chat</ButtonSpan>
          </Button>
        </ButtonDisplay>
        <WhiteFiller></WhiteFiller>
        <SocialDisplay>
          {currentFocus === "infos" && <Infos />}
          {currentFocus === "stats" && <PlayerStats />}
          {currentFocus === "chat" && (
            <Chat teamName={player.currentTeam.name} />
          )}
        </SocialDisplay>
      </PlayerContainer>
    </MainContainer>
  );
};

const PlayerImg = styled.img`
  border-radius: 100px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  position: inherit;
`;

const ModalContainer = styled.div`
  position: absolute;
  inset: 0;
  background-color: black;
  opacity: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayerContainer = styled.div`
  inset: 0;
  height: 800px;
  width: 550px;
  border-radius: 10px;
  background-color: white;
  font-family: "Vollkorn", serif;
`;

const PlayerDisplay = styled.div`
  // background-color: green;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamDisplay = styled.div`
  height: 75px;
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: inherit;
  gap: 5px;
  font-size: 18px;
`;

const LogoImage = styled.img`
  height: 45px;
  width: 45px;
`;

const Position = styled.p`
  margin: -10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
`;

export const Button = styled.button`
  border: none;
  width: 33%;
  font-weight: bold;
  background-color: inherit;

  &:hover {
    cursor: pointer;
    border-bottom: 3px solid black;
  }
  &:focus {
    color: ${(props) => props.backgroundColor};
    border-bottom: 3px solid ${(props) => props.backgroundColor};
    border-radius: 2px;
  }
`;

export const ButtonSpan = styled.span`
  font-weight: bold;
  font-size: 18px;
  transition: 0.5s;
`;

export const ButtonDisplay = styled.div`
  // background-color: green;
  width: inherit;
  height: 12px;
  padding-bottom: 8px;
`;

export const AddDisplay = styled.div`
  width: inherit;
  height: 100px;
  margin-top: -25px;
  background-color: inherit;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 150px;
`;

export const AddFavorites = styled.button`
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

export const AddToPool = styled.button`
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

export const SocialDisplay = styled.div`
  background-color: whitesmoke;
  width: 530px;
  height: 300px;
  display: flex;
  margin: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  //overflow-y: auto;
`;

export const WhiteFiller = styled.div`
  height: 5px;
  background-color: inherit;
`;

const LikeDiv = styled.div`
  background-color: inherit;
  height: 50px;
  width: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s;
  & :hover {
    transition-duration: 0.25s;
    color: crimson;
  }
  & ::after {
    content: "";
    display: block;
    position: absolute;
    border-radius: 4em;
    left: 0;
    top: 0;
    width: 50px;
    height: 50px;
    opacity: 0;
    transition: all 0.5s;
    box-shadow: 0 0 10px 40px whitesmoke;
  }
  & :active::after {
    box-shadow: 0 0 0 0 whitesmoke;
    position: absolute;
    border-radius: 4em;
    left: 0;
    top: 0;
    opacity: 1;
    transition: 0s;
  }
  & :active {
    top: 1px;
  }
`;

export default PlayerInfos;
