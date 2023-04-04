import React from "react";
import styled from "styled-components";

const Favourites = () => {
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
`;

export default Favourites;
