import { useState, useEffect, useContext } from "react";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const AdminButtons = () => {
  const {
    state: { adminPost },
    actions: { setAdminPost },
  } = useContext(InfoContext);

  const toggleAdmin = (e) => {
    if (adminPost === false) {
      return setAdminPost(true);
    }
    if (adminPost === true) {
      return setAdminPost(false);
    }
  };

  return (
    <>
      {adminPost ? (
        <AdminButton type="button" onClick={toggleAdmin}>
          Admin
        </AdminButton>
      ) : (
        <NormalButton type="button" onClick={toggleAdmin}>
          Normal
        </NormalButton>
      )}
    </>
  );
};

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
  right: 15%;
  bottom: 110%;
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
  right: 15%;
  bottom: 110%;
  &:hover {
    cursor: pointer;
    color: lightblue;
  }
`;

export default AdminButtons;
