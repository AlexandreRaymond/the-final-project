import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileInfos = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();
  const [yourProfile, setYourProfile] = useState("");

  let preslice = user.sub;
  let userId = preslice.slice(6, preslice.length);

  console.log("submarine", userId);

  useEffect(() => {
    axios.get(`/api/get/profile/${userId}`).then((response) => {
      console.log("profile response", response.data.data);
      setYourProfile(response.data.data);
    });
  }, []);

  return (
    <MainContainer>
      <h1>{user.nickname}'s infos</h1>
      <div>
        <div>
          {yourProfile.firstName ? (
            <div>
              <span>First Name:</span>
              <span>{yourProfile.firstName}</span>
            </div>
          ) : (
            <div>
              <span>First Name:</span>
            </div>
          )}
        </div>
        <div>
          {yourProfile.lastName ? (
            <div>
              <span>Last Name:</span>
              <span>{yourProfile.lastName}</span>
            </div>
          ) : (
            <div>
              <span>Last Name:</span>
            </div>
          )}
        </div>
        <div>
          {yourProfile.age ? (
            <div>
              <span>Age:</span>
              <span>{yourProfile.age}</span>
            </div>
          ) : (
            <div>
              <span>Age:</span>
            </div>
          )}
        </div>
        <div>
          {yourProfile.city ? (
            <div>
              <span>City:</span>
              <span>{yourProfile.city}</span>
            </div>
          ) : (
            <div>
              <span>City:</span>
            </div>
          )}
        </div>
        <div>
          {yourProfile.province ? (
            <div>
              <span>Province/State:</span>
              <span>{yourProfile.province}</span>
            </div>
          ) : (
            <div>
              <span>Province/State:</span>
            </div>
          )}
        </div>
        <div>
          {yourProfile.country ? (
            <div>
              <span>Country:</span>
              <span>{yourProfile.country}</span>
            </div>
          ) : (
            <div>
              <span>Country:</span>
            </div>
          )}
        </div>
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

export default ProfileInfos;
