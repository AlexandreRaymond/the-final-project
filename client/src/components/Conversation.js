import { useState, useEffect, useContext } from "react";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Conversation = ({ chatId }) => {
  const {
    state: { currentComments, currentTeam },
    actions: { setCurrentComments },
  } = useContext(InfoContext);

  const firstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    if (chatId) {
      axios.get(`/api/get/comments/${chatId}`).then((response) => {
        console.log("all the convos", response.data.data);
        setCurrentComments(response.data.data);
      });
    }
  }, [chatId]);

  if (!currentComments) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <div>Conversation {chatId}</div>
      <div>
        {currentComments.sort().map((post) => {
          return (
            <>
              <CommentDisplay>
                <UserDiv>
                  <Span>by</Span>
                  <UserSpan> {firstLetter(post.user)}</UserSpan>
                </UserDiv>
                <CommentDiv>
                  <Commentary>{firstLetter(post.comment)}</Commentary>
                </CommentDiv>

                <TimeDiv>
                  at {post.time} on {post.date}
                </TimeDiv>
              </CommentDisplay>
            </>
          );
        })}
      </div>
    </Wrapper>
  );
};

const CommentDisplay = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 500px;
  background-color: white;
  border: none;
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 2px 18px 24px;
  gap: 5px;
  margin: 8px;
`;

const CommentDiv = styled.div`
  margin-left: 30px;
  width: 400px;
  word-wrap: break-word;
`;

const Commentary = styled.p`
  width: 400px;
  overflow: hidden;
  font-size: 19px;
`;

const TimeDiv = styled.div`
  color: grey;
  margin-left: 350px;
  font-size: 12px;
  margin-bottom: 5px;
`;

const UserDiv = styled.div`
  margin-left: 15px;
  margin-top: 8px;
`;

const Span = styled.span`
  color: grey;
  font-size: 10px;
`;

const UserSpan = styled.span`
  font-weight: bold;
  margin-left: 5px;
`;

const Wrapper = styled.div`
  overflow-y: auto;
`;

export default Conversation;
