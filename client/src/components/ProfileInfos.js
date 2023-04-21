import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileInfos = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();

  return (
    <MainContainer>
      <h1>{user.nickname}'s infos</h1>
      <div></div>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 200px;
  margin: 35px auto;
  margin-top: 80px;
  align-items: center;
  justify-content: center;
`;

export default ProfileInfos;
