import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileInfos = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();

  const {
    state: { yourProfile, shouldUpdate },
    actions: { setYourProfile },
  } = useContext(InfoContext);

  let preslice = user.sub;
  let userId = preslice.slice(6, preslice.length);

  console.log("submarine", userId);

  useEffect(() => {
    axios.get(`/api/get/profile/${userId}`).then((response) => {
      console.log("profile response", response.data.data);
      setYourProfile(response.data.data);
    });
  }, [shouldUpdate]);

  return (
    <MainContainer>
      <div>
        <FNameDiv>
          {yourProfile.firstName ? (
            <DDiv>
              <div>
                <span>First Name:</span>
              </div>
              <div>
                <span>{yourProfile.firstName}</span>
              </div>
            </DDiv>
          ) : (
            <div>
              <span>First Name:</span>
            </div>
          )}
        </FNameDiv>
        <FNameDiv>
          {yourProfile.lastName ? (
            <DDiv>
              <span>Last Name:</span>
              <span>{yourProfile.lastName}</span>
            </DDiv>
          ) : (
            <div>
              <span>Last Name:</span>
            </div>
          )}
        </FNameDiv>
        <FNameDiv>
          {yourProfile.age ? (
            <DDiv>
              <span>Age:</span>
              <span>{yourProfile.age}</span>
            </DDiv>
          ) : (
            <div>
              <span>Age:</span>
            </div>
          )}
        </FNameDiv>
        <FNameDiv>
          {yourProfile.city ? (
            <DDiv>
              <span>City:</span>
              <span>{yourProfile.city}</span>
            </DDiv>
          ) : (
            <div>
              <span>City:</span>
            </div>
          )}
        </FNameDiv>
        <FNameDiv>
          {yourProfile.province ? (
            <DDiv>
              <span>Province/State:</span>
              <span>{yourProfile.province}</span>
            </DDiv>
          ) : (
            <div>
              <span>Province/State:</span>
            </div>
          )}
        </FNameDiv>
        <FNameDiv>
          {yourProfile.country ? (
            <DDiv>
              <span>Country:</span>
              <span>{yourProfile.country}</span>
            </DDiv>
          ) : (
            <div>
              <span>Country:</span>
            </div>
          )}
        </FNameDiv>
      </div>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  min-height: 200px;
  align-items: center;
  justify-content: center;
`;

const FNameDiv = styled.div`
  width: 300px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

const DDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 250px;
`;

export default ProfileInfos;
