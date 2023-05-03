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
import { ButtonDisplay, ButtonSpan } from "./PlayerInfos";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { Spinner } from "./Home";

const Profile = () => {
  const SpinnerIcon = withBaseIcon({ size: 50 });
  const navigate = useNavigate();
  const { isAuthenticated, logout, user, isLoading } = useAuth0();

  const {
    state: { currentFocus, yourProfile },
    actions: { setCurrentFocus },
  } = useContext(InfoContext);

  const firstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (isLoading) {
    return (
      <Spinner>
        <SpinnerIcon icon={spinner3} />
      </Spinner>
    );
  }
  console.log("Profile User", user);

  return (
    isAuthenticated && (
      <MainContainer>
        <ProfileDisplay>
          <ImgDiv>
            {yourProfile.picture ? (
              <ProfileImg src={yourProfile.picture} alt={user.name} />
            ) : (
              <ProfileImg src={user.picture} alt={user.name} />
            )}
          </ImgDiv>
          <InfoDiv>
            <span>
              <BigSpan>{firstLetter(user.nickname)}</BigSpan>
            </span>
            <div>
              <ProfileInfos />
            </div>
          </InfoDiv>
        </ProfileDisplay>
        <ButtonDisplay>
          {/* <Button
            autoFocus
            id="profileInfos"
            onClick={() => setCurrentFocus("profileInfos")}
          >
            Infos
          </Button> */}
          <Button id="favourites" onClick={() => setCurrentFocus("favourites")}>
            Favourites
          </Button>
          <Button id="options" onClick={() => setCurrentFocus("options")}>
            Options
          </Button>
        </ButtonDisplay>
        <WhiteF></WhiteF>
        <FocusedDisplay>
          {/* {currentFocus === "profileInfos" && <ProfileInfos />} */}
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
  font-family: "Vollkorn", serif;
`;

const ProfileDisplay = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  background-color: whitesmoke;
  border-radius: 200px;
  width: 60%;
  height: 250px;
  margin: 20px 0;
  box-shadow: rgba(149, 157, 165, 0.2) 2px 18px 24px;
`;

const ProfileImg = styled.img`
  height: 250px;
  width: 250px;
  border-radius: 200px;
  border: none;
  box-shadow: rgba(149, 157, 165, 0.2) 2px 18px 24px;
`;

const ImgDiv = styled.div``;

const FocusedDisplay = styled.div`
  height: 500px;
  width: 45%;
  overflow-y: auto;
  box-shadow: rgba(149, 157, 165, 0.2) 2px 18px 24px;
  background-color: whitesmoke;
`;

const WhiteF = styled.div`
  height: 10px;
  background-color: inherit;
`;

const Button = styled.button`
  border: none;
  width: 50%;
  font-weight: bold;
  font-size: 20px;
  background-color: inherit;

  &:hover {
    cursor: pointer;
    color: coral;
  }
  &:focus {
    color: lightcoral;
  }
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const BigSpan = styled.span`
  font-size: 35px;
  width: 500px;
  padding: 0 20px;
  margin-left: 30px;
`;

export default Profile;
