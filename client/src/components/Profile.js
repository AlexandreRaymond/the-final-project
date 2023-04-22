import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { InfoContext } from "./InfoContext";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { useAuth0 } from "@auth0/auth0-react";
import Favourites from "./Favourites";
import ProfileInfos from "./ProfileInfos";
import ProfileOptions from "./ProfileOptions";
import { WhiteFiller, Button, ButtonDisplay, ButtonSpan } from "./PlayerInfos";

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user, isLoading, getAccessTokenSilently } =
    useAuth0();

  const {
    state: { currentFocus },
    actions: { setCurrentFocus },
  } = useContext(InfoContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log("Profile User", user);

  return (
    isAuthenticated && (
      <MainContainer>
        <ProfileDisplay>
          <img src={user.picture} alt={user.name} />
          <h2>{user.nickname}</h2>
          <p>{user.email}</p>
        </ProfileDisplay>
        <ButtonDisplay>
          <Button
            id="profileInfos"
            onClick={() => setCurrentFocus("profileInfos")}
          >
            Infos
          </Button>
          <Button id="favourites" onClick={() => setCurrentFocus("favourites")}>
            Favourites
          </Button>
          <Button
            autoFocus
            id="options"
            onClick={() => setCurrentFocus("options")}
          >
            Options
          </Button>
        </ButtonDisplay>
        <WhiteF></WhiteF>
        <FocusedDisplay>
          {currentFocus === "profileInfos" && <ProfileInfos />}
          {currentFocus === "options" && <ProfileOptions />}
          {currentFocus === "favourites" && <Favourites />}
        </FocusedDisplay>
      </MainContainer>
    )
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  min-height: 90vh;
  margin: 35px auto;
  margin-top: 80px;
  align-items: center;
  justify-content: center;
  background-color: red;
`;

const ProfileDisplay = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  background-color: blue;
  width: 80%;
  height: 250px;
  margin: 20px 0;
`;

const FocusedDisplay = styled.div`
  background-color: green;
  height: 500px;
  width: 80%;
`;

const WhiteF = styled.div`
  height: 10px;
  background-color: inherit;
`;

export default Profile;
