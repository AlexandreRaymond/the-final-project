import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileOptions = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth0();

  return (
    <MainContainer>
      <h1>{user.nickname}'s options</h1>

      <LogOut
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        <p>Logout</p>
      </LogOut>
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

const LogOut = styled.button`
  display: flex;
  border: none;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  background-color: red;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  &:hover {
    cursor: pointer;
    opacity: 80%;
  }
`;

export default ProfileOptions;
