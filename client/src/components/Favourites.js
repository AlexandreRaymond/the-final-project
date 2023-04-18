import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { InfoContext } from "./InfoContext";

const Favourites = () => {
  const navigate = useNavigate();
  const {
    state: { logged },
  } = useContext(InfoContext);
  console.log("Favourites log", logged);

  useEffect(() => {
    if (!logged) {
      return navigate("/");
    }
  }, []);

  return (
    <MainContainer>
      <h1>Favourites</h1>
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
  background-color: darkgreen;
`;

export default Favourites;
