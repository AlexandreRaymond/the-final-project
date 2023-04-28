import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import teamColors from "../utils/backgrounds";
import { InfoContext } from "./InfoContext";
import Conversation from "./Conversation";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Chat = () => {
  const { isAuthenticated, logout, user, isLoading, getAccessTokenSilently } =
    useAuth0();

  const navigate = useNavigate();

  let preslice = user.sub;
  let userId = preslice.slice(6, preslice.length);

  const {
    state: { currentPlayer, yourComment },
    actions: { setYourComment, setShouldUpdate },
  } = useContext(InfoContext);

  console.log("blahblahblah", currentPlayer);
  const player = currentPlayer.people[0];
  const color = teamColors[player.currentTeam.name];

  const addZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  let hours = addZero(today.getHours());
  let minutes = addZero(today.getMinutes());
  let seconds = addZero(today.getSeconds());

  let time = `${hours}:${minutes}:${seconds}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/api/post/comment`, {
        comment: yourComment,
        user: user,
        userId: userId,
        date: date,
        time: time,
        player: player.fullName,
        playerId: player.id,
      })
      .then((response) => {
        console.log("Good response", response);
        setShouldUpdate(true);
      })
      .catch((err) => {
        console.log("Error", err);
      });
    navigate(`/api/player/${player.id}/chat`);
  };

  return (
    <Wrapper>
      <ChatArea>
        <Conversation chatId={player.id} />
      </ChatArea>
      {/* <ChatArea>Latest on {player.fullName}</ChatArea> */}
      <div>
        <GoToDiv>
          <span>
            Click <ChatLink to={`/api/player/${player.id}/chat`}>here</ChatLink>{" "}
            to see {player.fullName}'s comment section.
          </span>
        </GoToDiv>
        <Form onSubmit={handleSubmit}>
          <Input
            rows="60"
            cols="2"
            value={yourComment}
            maxLength="125"
            placeholder={" Comment here"}
            onChange={(e) => setYourComment(e.target.value)}
          />
          <Postin>
            <Wordcount>{yourComment.length}</Wordcount>
            <span>
              {yourComment.length > 100 ? (
                <SendComment
                  type="submit"
                  disabled="disabled"
                  backgroundColor={color}
                >
                  Too long
                </SendComment>
              ) : (
                <SendComment type="submit" backgroundColor={color}>
                  SEND
                </SendComment>
              )}
            </span>
          </Postin>
        </Form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChatArea = styled.div`
  background-color: grey;
  height: 150px;
  width: 520px;
  margin: 10px 10px 10px 10px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
  overflow-x: hidden;
  z-index: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

const Input = styled.textarea`
  position: relative;
  resize: none;
  height: 100px;
  width: 500px;
  margin-top: 5px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const Postin = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

const Wordcount = styled.span`
  position: absolute;
  color: darkgray;
  display: flex;
  flex-direction: row;
  right: 1.5%;
  bottom: 120%;
`;

const GoToDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  & span {
    font-size: 12px;
  }
`;

const SendComment = styled.button`
  border: none;
  border-radius: 5px;
  margin-top: 3px;
  width: 505px;
  height: 30px;
  color: whitesmoke;
  font-weight: bold;
  background-color: ${(props) => props.backgroundColor};

  &:hover {
    cursor: pointer;
    opacity: 80%;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 50%;
    background-color: grey;
  }
`;

const ChatLink = styled(NavLink)``;

export default Chat;
