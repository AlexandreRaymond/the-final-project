import { useState, useEffect, useContext } from "react";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { AiFillEdit } from "react-icons/ai";
import { TiCancel } from "react-icons/ti";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { Spinner } from "./Home";

const Conversation = ({ chatId }) => {
  const SpinnerIcon = withBaseIcon({ size: 50 });
  const {
    state: { currentComments, yourProfile, shouldUpdate },
    actions: { setCurrentComments, setYourProfile, setShouldUpdate },
  } = useContext(InfoContext);

  const [isEdit, setIsEdit] = useState(null);

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
    return (
      <Spinner>
        <SpinnerIcon icon={spinner3} />
      </Spinner>
    );
  }

  console.log("you are", currentComments[0]);

  return (
    <>
      {/* <div>Conversation {chatId}</div> */}
      <Wrapper>
        {currentComments.sort().map((post) => {
          let commentId = post["_id"];
          console.log("post", post);
          return (
            <>
              <CommentDisplay adminPost={post.adminPost}>
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
                          {isEdit == commentId ? (
                            <>
                              <OptionsDiv>
                                <CancelButton onClick={(e) => setIsEdit(null)}>
                                  <TiCancel />
                                </CancelButton>
                                <DeleteComment commentId={commentId} />
                              </OptionsDiv>
                            </>
                          ) : (
                            <>
                              <div>
                                <EditButton
                                  onClick={() => setIsEdit(commentId)}
                                >
                                  <AiFillEdit />
                                </EditButton>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      <div></div>
                    )}
                  </EditDiv>
                </TopDiv>
                <CommentDiv>
                  {isEdit == commentId ? (
                    <EditComment commentId={commentId} setIsEdit={setIsEdit} />
                  ) : (
                    <Commentary>{firstLetter(post.comment)}</Commentary>
                  )}
                </CommentDiv>

                {post.editedComment ? (
                  <>
                    <BottomDiv>
                      Edited at {post.editedTime} on {post.editedDate}
                    </BottomDiv>
                  </>
                ) : (
                  <>
                    <BottomDiv>
                      at {post.time} on {post.date}
                    </BottomDiv>
                  </>
                )}
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
  background-color: ${(props) => (props.adminPost ? "beige" : "white")};
  border: none;
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 2px 18px 24px;
  gap: 5px;
  width: 500px;
  font-family: "Vollkorn", serif;
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
  font-size: 20px;
  font-weight: bold;
  color: lightgray;
  border: none;
  background-color: inherit;
  &:hover {
    cursor: pointer;
    color: blue;
  }
`;

const CancelButton = styled.button`
  font-size: 16px;
  font-weight: bold;
  color: lightgray;
  border: none;
  background-color: inherit;
  &:hover {
    cursor: pointer;
    color: black;
  }
`;

const OptionsDiv = styled.div`
  display: flex;
  gap: 5px;
`;

export default Conversation;
