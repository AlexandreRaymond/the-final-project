import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import teamColors from "../utils/backgrounds";
import { InfoContext } from "./InfoContext";

const Chat = () => {
  const [yourComment, setYourComment] = useState("");
  const {
    state: { currentPlayer },
  } = useContext(InfoContext);

  console.log("blahblahblah", currentPlayer);
  const player = currentPlayer.people[0];
  const color = teamColors[player.currentTeam.name];

  return (
    <Wrapper>
      <ChatArea>Latest on {player.fullName}</ChatArea>
      <div>
        <GoToDiv>
          <span>
            Click <>here</> to see {player.fullName}'s comment section.
          </span>
        </GoToDiv>
        <Form>
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
  width: 500px;
  margin: 10px 10px 10px 10px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
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

export default Chat;
