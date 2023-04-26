import { useState, useEffect, useContext } from "react";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { AiFillEdit } from "react-icons/ai";

const Conversation = ({ chatId, shouldUpdate, setShouldUpdate }) => {
  const {
    state: { currentComments, yourProfile },
    actions: { setCurrentComments, setYourProfile },
  } = useContext(InfoContext);

  const { user } = useAuth0();

  let preslice = user.sub;
  let userId = preslice.slice(6, preslice.length);

  const firstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    if (chatId && shouldUpdate) {
      axios.get(`/api/get/comments/${chatId}`).then((response) => {
        console.log("all the convos", response.data.data);
        setCurrentComments(response.data.data);
      });
      setShouldUpdate(false);
    }
    if (userId) {
      axios.get(`/api/get/profile/${userId}`).then((response) => {
        console.log("profile response", response.data.data);
        setYourProfile(response.data.data);
      });
    }
  }, [chatId, shouldUpdate, userId]);

  if (!currentComments) {
    return <div>Loading...</div>;
  }

  console.log("you are", currentComments[0]);

  return (
    <>
      {/* <div>Conversation {chatId}</div> */}
      <Wrapper>
        {currentComments.sort().map((post) => {
          console.log("post", post);
          return (
            <>
              <CommentDisplay>
                <TopDiv>
                  <div>
                    {userId === post.userId ? (
                      <YourSpan>You wrote</YourSpan>
                    ) : (
                      <>
                        <Span>by</Span>
                        <UserSpan> {firstLetter(post.user)}</UserSpan>
                      </>
                    )}
                  </div>
                  <EditDiv>
                    {userId === post.userId || yourProfile.isAdmin ? (
                      <>
                        <div>
                          <EditButton>
                            <AiFillEdit />
                          </EditButton>
                        </div>
                        <div>
                          <DeleteButton>X</DeleteButton>
                        </div>
                      </>
                    ) : (
                      <div></div>
                    )}
                  </EditDiv>
                </TopDiv>
                <CommentDiv>
                  <Commentary>{firstLetter(post.comment)}</Commentary>
                </CommentDiv>

                <BottomDiv>
                  at {post.time} on {post.date}
                </BottomDiv>
              </CommentDisplay>
            </>
          );
        })}
      </Wrapper>
    </>
  );
};

const CommentDisplay = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: none;
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 2px 18px 24px;
  gap: 5px;
  width: 500px;

  margin: 12px 0;
`;

const CommentDiv = styled.div`
  word-wrap: break-word;
  padding: 0 10px;
`;

const Commentary = styled.p`
  font-size: 18px;
  font-weight: bold;
  padding-left: 12px;
`;

const BottomDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding: 0 10px 2px 10px;
  color: grey;
  font-size: 12px;
`;

const TopDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 3px 10px 0 10px;
  justify-content: space-between;
`;

const Span = styled.span`
  color: grey;
  font-size: 10px;
  padding-left: 3px;
`;

const UserSpan = styled.span`
  font-weight: bold;
  color: darkblue;
`;

const YourSpan = styled.span`
  color: black;
  opacity: 80%;
  font-size: 14px;
  padding-left: 3px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 499px;
  width: 600px;
`;

const EditDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const DeleteButton = styled.button`
  font-size: 13px;
  font-weight: bold;
  color: lightgray;
  border: none;
  background-color: inherit;
  &:hover {
    cursor: pointer;
    color: red;
  }
`;

const EditButton = styled.button`
  font-size: 16px;
  font-weight: bold;
  color: lightgray;
  border: none;
  background-color: inherit;
  &:hover {
    cursor: pointer;
    color: blue;
  }
`;

export default Conversation;
