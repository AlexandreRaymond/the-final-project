import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { InfoContext } from "./InfoContext";

const Home = () => {
  const navigate = useNavigate();
  const {
    state: { logged },
  } = useContext(InfoContext);
  console.log("Home log", logged);

  useEffect(() => {
    if (!logged) {
      return navigate("/");
    }
  }, []);

  return (
    <MainContainer>
      <h1>Homepage</h1>
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

export default Home;
