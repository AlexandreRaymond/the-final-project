import { useContext } from "react";
import styled from "styled-components";
import { NavButton, NavBrowse, Wrapper } from "./Teams";
import { InfoContext } from "./InfoContext";

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
  font-family: "Racing Sans One", cursive;
  font-size: 25px;
`;

export default Standings;
