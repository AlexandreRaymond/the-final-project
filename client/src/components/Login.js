import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  // Logics
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();

  // On the page
  return (
    <>
      <MainContainer>
        <StyledButton onClick={() => loginWithRedirect()}>
          <p>Login</p>
        </StyledButton>
      </MainContainer>
    </>
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

const StyledButton = styled.button`
  height: 100px;
  width: 100px;
`;

export default Login;
