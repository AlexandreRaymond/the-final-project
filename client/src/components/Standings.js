import { useState } from "react";
import styled from "styled-components";
import { NavButton, NavBrowse, ButtonContainer, Wrapper } from "./Teams";
import { NavLink } from "react-router-dom";

const Standings = () => {
  return (
    <MainContainer>
      <h1>Standings</h1>
      <Wrapper>
        <NavBrowse to="/standings/nhl">
          <NavButton>NHL Standing</NavButton>
        </NavBrowse>
        <NavButton onClick={() => window.alert("Coming soon!")}>
          Pool Standing
        </NavButton>
      </Wrapper>
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

export default Standings;
