import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { InfoContext } from "./InfoContext";

const Login = () => {
  // Logics
  const navigate = useNavigate();
  const {
    actions: { setLogged },
  } = useContext(InfoContext);

  const handlechange = () => {
    setLogged(true);
    navigate("/home");
  };

  // On the page
  return (
    <>
      <MainContainer>
        <StyledButton
          onClick={() => {
            setLogged(true);
            navigate("/home");
          }}
        >
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
