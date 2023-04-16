import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
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
