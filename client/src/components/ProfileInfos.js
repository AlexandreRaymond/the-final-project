import { useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { Spinner } from "./Home";

const ProfileInfos = () => {
  const SpinnerIcon = withBaseIcon({ size: 50 });
  const { user, isLoading } = useAuth0();

  const {
    state: { yourProfile, shouldUpdate },
    actions: { setYourProfile },
  } = useContext(InfoContext);

  let preslice = user.sub;
  let userId = preslice.slice(6, preslice.length);

  useEffect(() => {
    axios.get(`/api/get/profile/${userId}`).then((response) => {
      setYourProfile(response.data.data);
    });
  }, [shouldUpdate]);

  if (isLoading) {
    return (
      <Spinner>
        <SpinnerIcon icon={spinner3} />
      </Spinner>
    );
  }

  return (
    <MainContainer>
      <div>
        <FNameDiv>
          {yourProfile.firstName ? (
            <DDiv>
              <div>
                <Sspan>First Name:</Sspan>
              </div>
              <div>
                <span>{yourProfile.firstName}</span>
              </div>
            </DDiv>
          ) : (
            <div>
              <Sspan>First Name:</Sspan>
            </div>
          )}
        </FNameDiv>
        <FNameDiv>
          {yourProfile.lastName ? (
            <DDiv>
              <Sspan>Last Name:</Sspan>
              <span>{yourProfile.lastName}</span>
            </DDiv>
          ) : (
            <div>
              <Sspan>Last Name:</Sspan>
            </div>
          )}
        </FNameDiv>
        <FNameDiv>
          {yourProfile.age ? (
            <DDiv>
              <Sspan>Age:</Sspan>
              <span>{yourProfile.age}</span>
            </DDiv>
          ) : (
            <div>
              <Sspan>Age:</Sspan>
            </div>
          )}
        </FNameDiv>
        <FNameDiv>
          {yourProfile.city ? (
            <DDiv>
              <Sspan>City:</Sspan>
              <span>{yourProfile.city}</span>
            </DDiv>
          ) : (
            <div>
              <Sspan>City:</Sspan>
            </div>
          )}
        </FNameDiv>
        <FNameDiv>
          {yourProfile.province ? (
            <DDiv>
              <Sspan>Province/State:</Sspan>
              <span>{yourProfile.province}</span>
            </DDiv>
          ) : (
            <div>
              <Sspan>Province/State:</Sspan>
            </div>
          )}
        </FNameDiv>
        <FNameDiv>
          {yourProfile.country ? (
            <DDiv>
              <Sspan>Country:</Sspan>
              <span>{yourProfile.country}</span>
            </DDiv>
          ) : (
            <div>
              <Sspan>Country:</Sspan>
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

const Sspan = styled.span`
  font-weight: bold;
`;

export default ProfileInfos;
