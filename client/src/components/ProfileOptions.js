import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileOptions = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth0();
  const [profileInfo, setProfileInfo] = useState({
    firstName: "",
    lastName: "",
    age: "",
    city: "",
    province: "",
    country: "",
  });

  let preslice = user.sub;
  let userId = preslice.slice(6, preslice.length);

  console.log("submarine", userId);

  const handleChange = (value, name) => {
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    let filteredInfo = {};

    const entries = Object.entries(profileInfo);
    entries.forEach((entry) => {
      if (entry[1] !== "") {
        console.log("entry", entry);
        filteredInfo[entry[0]] = entry[1];
      }
    });
    console.log("filter", filteredInfo);

    //if (/* dont update property if empty string*/ )

    axios
      .patch(`/api/patch/profile/${userId}`, {
        profileInfo: filteredInfo,
      })
      .then((response) => {
        console.log("Profile updated", response);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <MainContainer>
      <h1>{user.nickname}'s options</h1>
      <div>
        <form onSubmit={(e) => handleSumbit(e)}>
          <div>
            <span>Name:</span>
            <input
              name="firstName"
              type="text"
              placeholder={"Your first name"}
              maxLength="25"
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
            <input
              name="lastName"
              type="text"
              placeholder={"Your last name"}
              maxLength="25"
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </div>
          <div>
            <span>Age:</span>
            <input
              name="age"
              type="number"
              placeholder="Your age"
              min="1"
              max="150"
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </div>
          <div>
            <span>Address:</span>
            <input
              name="city"
              type="text"
              placeholder={"Your city"}
              maxLength="20"
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
            <input
              name="province"
              type="text"
              placeholder={"Your Province or State"}
              maxLength="20"
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
            <input
              name="country"
              type="text"
              placeholder={"Your country"}
              maxLength="20"
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </div>
          <button type="submit">Save changes</button>
        </form>
      </div>
      <div>
        <h3>Other</h3>
        <LogOut
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          <p>Logout</p>
        </LogOut>
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

const LogOut = styled.button`
  display: flex;
  border: none;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  background-color: red;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  &:hover {
    cursor: pointer;
    opacity: 80%;
  }
`;

export default ProfileOptions;
