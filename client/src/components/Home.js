import { useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { withBaseIcon } from "react-icons-kit";
import axios from "axios";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";
import HeroDisplay from "./HeroDisplay";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";

const Home = () => {
  const SpinnerIcon = withBaseIcon({ size: 50 });
  const auth = useAuth0();
  const {
    state: { homeFeed },
    actions: { setHomeFeed },
  } = useContext(InfoContext);

  const firstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    axios.get(`/api/get/homefeed`).then((response) => {
      setHomeFeed(response.data.data);
    });
  }, []);

  if (!homeFeed) {
    return (
      <>
        <HeroDiv>
          <HeroDisplay />
        </HeroDiv>
        <LogDiv>
          {auth.isAuthenticated ? (
            <h1>
              {firstLetter(auth.user.nickname)}, <br></br> here what's new:
            </h1>
          ) : (
            <LoginButton onClick={() => auth.loginWithRedirect()}>
              Login
            </LoginButton>
          )}
        </LogDiv>
        <Spinner>
          <SpinnerIcon icon={spinner3} />
        </Spinner>
      </>
    );
  }

  return (
    <>
      <HeroDiv>
        <HeroDisplay />
      </HeroDiv>
      <LogDiv>
        {auth.isAuthenticated ? (
          <h1>
            {firstLetter(auth.user.nickname)}, <br></br> here what's new:
          </h1>
        ) : (
          <LoginButton onClick={() => auth.loginWithRedirect()}>
            Login
          </LoginButton>
        )}
      </LogDiv>
      <MainContainer>
        <Wrapper>
          {homeFeed.sort().map((feed) => {
            console.log("all feed", feed);
            return (
              <CommentDisplay>
                <TopDiv>
                  <div>
                    <Span>by</Span>
                    <UserSpan> {firstLetter(feed.user)}</UserSpan>
                    <Span>on</Span>
                    <PlayerSpan> {firstLetter(feed.player)}</PlayerSpan>
                  </div>
                </TopDiv>
                <CommentDiv>
                  <Commentary>{feed.comment}</Commentary>
                </CommentDiv>
                <BottomDiv>
                  at {feed.time} on {feed.date}
                </BottomDiv>
              </CommentDisplay>
            );
          })}
        </Wrapper>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: auto;
  margin: 35px auto;
  margin-top: 80px;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
`;

const HeroDiv = styled.div`
  display: flex;
  width: 100%;
`;

const LogDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
  margin-bottom: -50px;
  font-family: "Vollkorn", serif;
  & h1 {
    text-align: center;
  }
`;

const LoginButton = styled.button`
  height: 80px;
  width: 300px;
  font-size: 35px;
  font-weight: bold;
  border: none;
  color: whitesmoke;
  background-color: red;
  border-radius: 15px;
  margin-top: 30px;
  &:hover {
    cursor: pointer;
    background-color: crimson;
  }
`;

const Wrapper = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 550px;
`;

const CommentDisplay = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: beige;
  border: none;
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 2px 18px 24px;
  gap: 5px;
  width: 500px;
  margin: 12px 0;
  font-family: "Vollkorn", serif;
`;

const UserSpan = styled.span`
  font-weight: bold;
  color: darkblue;
`;

const PlayerSpan = styled.span`
  color: black;
`;

const Span = styled.span`
  color: grey;
  font-size: 10px;
  padding-left: 3px;
`;

const TopDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 3px 10px 0 10px;
  margin-top: 5px;
  justify-content: space-between;
`;

const CommentDiv = styled.div`
  word-wrap: break-word;
  padding: 0 10px;
`;

const Commentary = styled.p`
  font-size: 18px;
  font-weight: bold;
  padding-left: 12px;
`;

const BottomDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding: 0 10px 2px 10px;
  color: grey;
  font-size: 12px;
`;

export const SpinnerMove = keyframes`
from{
  transform: rotate(0deg)
}
to{
transform:rotate(360deg)
}
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  animation: ${SpinnerMove} 1.5s linear infinite;
  position: relative;
  margin: 40vh auto;
  color: #1e81b0;
  scale: 1.2;
`;

export default Home;
