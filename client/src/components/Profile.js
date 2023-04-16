import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { InfoContext } from "./InfoContext";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const Profile = () => {
  const navigate = useNavigate();
  const {
    actions: { setLogged },
  } = useContext(InfoContext);
  const {
    state: { logged },
  } = useContext(InfoContext);

  if (logged === false) {
    return (
      <>
        <Login />
      </>
    );
  }

  return (
    <MainContainer>
      <h1>Profile</h1>
      <button
        onClick={() => {
          setLogged(false);
          navigate("/");
        }}
      >
        <p>Logout</p>
      </button>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 90vh;
  margin: 35px auto;
  margin-top: 80px;
  align-items: center;
  justify-content: center;
`;

export default Profile;
