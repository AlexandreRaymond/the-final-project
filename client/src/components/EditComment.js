import { useState, useEffect, useContext } from "react";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineCheck } from "react-icons/ai";

const EditComment = ({ commentId, setIsEdit }) => {
  const {
    state: {
      editedComment,
      yourComment,
      currentChat,
      currentTeam,
      shouldUpdate,
      adminPost,
      yourProfile,
    },
    actions: { setEditedComment, setShouldUpdate, setShowToast, setAdminPost },
  } = useContext(InfoContext);
  console.log("i wrote", editedComment);

  const { isAuthenticated, logout, user, isLoading, getAccessTokenSilently } =
    useAuth0();

  let playerId = currentChat.person.id;
  let preslice = user.sub;
  let userId = preslice.slice(6, preslice.length);

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

  const editInfo = {
    comment: editedComment,
    editedComment: true,
    user: user,
    userId: userId,
    editedDate: date,
    editedTime: time,
    player: currentChat.person.fullName,
    playerId: playerId,
    adminPost: adminPost,
  };

  const toggleAdmin = (e) => {
    if (adminPost === false) {
      return setAdminPost(true);
    }
    if (adminPost === true) {
      return setAdminPost(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedComment.length == 0) {
      return setIsEdit(null);
    }
    axios
      .patch(`/api/patch/comment/${commentId}`, {
        editInfo: editInfo,
      })
      .then((response) => {
        console.log("Good response", response);
        setShouldUpdate(true);
        setEditedComment("");
      })
      .catch((err) => {
        console.log("Error", err);
      });
    setShowToast({
      isShowing: true,
      message: "Message successfuly edited!",
      duration: 3000,
    });
    setIsEdit(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <EditInput
          rows="50"
          cols="2"
          value={editedComment}
          maxLength="125"
          placeholder={yourComment}
          onChange={(e) => setEditedComment(e.target.value)}
        />
        <Postin>
          <span>
            {editedComment.length > 100 ? (
              <SendComment type="submit" disabled="disabled">
                <AiOutlineCheck />
              </SendComment>
            ) : (
              <SendComment type="submit">
                <AiOutlineCheck />
              </SendComment>
            )}
          </span>
          {yourProfile.isAdmin && adminPost ? (
            <AdminButton onClick={toggleAdmin}>Admin</AdminButton>
          ) : (
            <NormalButton onClick={toggleAdmin}>Normal</NormalButton>
          )}
          <Wordcount>{editedComment.length}</Wordcount>
        </Postin>
      </form>
    </>
  );
};

const EditInput = styled.textarea`
  font-size: 18px;
  font-weight: bold;
  font-family: "Vollkorn", serif;
  padding-left: 12px;
  margin-left: 10px;
  border: 1px solid whitesmoke;
  border-radius: 5px;
  resize: none;
  height: 80px;
  width: 450px;
`;

const Postin = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  z-index: 1;
`;

const Wordcount = styled.span`
  position: absolute;
  color: darkgray;
  display: flex;
  flex-direction: row;
  right: 5%;
  bottom: 120%;
`;

const SendComment = styled.button`
  font-size: 16px;
  font-weight: bold;
  margin: 3px 0 0 25px;
  color: whitesmoke;
  border: none;
  border-radius: 50px;
  background-color: lightgray;

  &:hover {
    cursor: pointer;
    background-color: inherit;
    color: green;
  }
  &:hover:disabled {
    cursor: not-allowed;
    background-color: red;
    color: whitesmoke;
  }
`;

const AdminButton = styled.button`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  border: none;
  height: 20px;
  width: 20px;
  color: limegreen;
  background-color: inherit;
  display: flex;
  flex-direction: row;
  right: 18%;
  bottom: 100%;
  &:hover {
    cursor: pointer;
    color: lime;
  }
`;

const NormalButton = styled.button`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  border: none;
  height: 20px;
  width: 20px;
  color: blue;
  background-color: inherit;
  display: flex;
  flex-direction: row;
  right: 18%;
  bottom: 100%;
  &:hover {
    cursor: pointer;
    color: lightblue;
  }
`;

export default EditComment;
