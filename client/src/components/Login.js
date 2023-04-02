import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";

const Login = ({ setLoggedIn }) => {
  // Logics
  const navigate = useNavigate();

  const handlechange = () => {
    setLoggedIn(true);
    navigate("/home");
  };

  // On the page
  return (
    <>
      <MainContainer>
        <StyledButton onClick={() => handlechange}>
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

const StyledButton = styled.button``;

export default Login;
