import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";

const Favourites = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();

  let preslice = user.sub;
  let userId = preslice.slice(6, preslice.length);

  const {
    state: { currentFav },
    actions: { setCurrentFav },
  } = useContext(InfoContext);

  useEffect(() => {
    axios.get(`/api/get/favourites/${userId}`).then((response) => {
      console.log("favourite answer", response.data.data);
      setCurrentFav(response.data.data);
    });
  }, []);

  return (
    <MainContainer>
      <div>
        <h1>{user.nickname}'s favourites</h1>
      </div>
      <div>
        {currentFav.sort().map((player) => {
          return (
            <>
              <div>{player.name}</div>
            </>
          );
        })}
      </div>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 200px;
  margin: 35px auto;
  margin-top: 80px;
  align-items: center;
  justify-content: center;
`;

export default Favourites;
