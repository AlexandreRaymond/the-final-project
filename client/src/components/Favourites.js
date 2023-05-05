import { useEffect, useContext } from "react";
import styled from "styled-components";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { Spinner } from "./Home";
import axios from "axios";
import { InfoContext } from "./InfoContext";
import { useAuth0 } from "@auth0/auth0-react";
import teamColors from "../utils/backgrounds";
import RemoveFav from "./RemoveFav";

const Favourites = () => {
  const SpinnerIcon = withBaseIcon({ size: 50 });
  const { user } = useAuth0();

  let preslice = user.sub;
  let userId = preslice.slice(6, preslice.length);

  const {
    state: { currentFav, shouldUpdate },
    actions: { setCurrentFav },
  } = useContext(InfoContext);

  useEffect(() => {
    axios.get(`/api/get/favourites/${userId}`).then((response) => {
      setCurrentFav(response.data.data);
    });
  }, [shouldUpdate]);

  if (!currentFav) {
    return (
      <Spinner>
        <SpinnerIcon icon={spinner3} />
      </Spinner>
    );
  }

  return (
    <MainContainer>
      <div>
        {currentFav.sort().map((player) => {
          let color = teamColors[player.team];
          return (
            <Wrapper backgroundColor={color}>
              <ImgDiv>
                <PlayerImg src={player.picture} />
              </ImgDiv>
              <InfoDiv>
                <NameDiv>
                  {player.name} {player.alternateCaptain ? " (A)" : ""}
                  {player.captain ? " (C)" : ""}{" "}
                </NameDiv>
                <StatDiv>
                  {player.wins ? (
                    <>
                      <div>
                        <p>GP </p>
                        <br></br>
                        <span>{player.gp}</span>
                      </div>
                      <div>
                        <p>W </p> <br></br>
                        <span>{player.wins}</span>
                      </div>
                      <div>
                        <p>L </p> <br></br>
                        <span>{player.losses}</span>
                      </div>
                      <div>
                        <p>OT </p> <br></br>
                        <span>{player.ot}</span>
                      </div>
                      <div>
                        <p>GAA </p> <br></br>
                        <span>{player.gaa}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p>GP </p>
                        <br></br>
                        <span>{player.gp}</span>
                      </div>
                      <div>
                        <p>G </p> <br></br>
                        <span>{player.goals}</span>
                      </div>
                      <div>
                        <p>A </p> <br></br>
                        <span>{player.assists}</span>
                      </div>
                      <div>
                        <p>P </p> <br></br>
                        <span>{player.points}</span>
                      </div>
                      <div>
                        <p>+/- </p> <br></br>
                        <span>{player.plusMinus}</span>
                      </div>
                    </>
                  )}
                </StatDiv>
              </InfoDiv>
              <div>
                <RemoveFav player={player} />
              </div>
            </Wrapper>
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
  font-family: "Vollkorn", serif;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  color: whitesmoke;
  background-color: ${(props) => props.backgroundColor};
  width: 450px;
  height: 80px;
  margin: 10px;
  gap: 50px;
  border: none;
  border-radius: 200px;
  box-shadow: rgba(149, 157, 165, 0.2) 2px 18px 24px;
`;

const PlayerImg = styled.img`
  height: 85px;
  border: none;
  border-radius: 200px;
`;

const ImgDiv = styled.div`
  border-radius: 200px;
  display: flex;
  align-items: center;
  justify-content: left;
  width: 15%;
`;

const InfoDiv = styled.div`
  & span {
    font-size: 15px;
    font-weight: bold;
  }
`;

const StatDiv = styled.div`
  display: flex;
  width: 250px;
  height: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  font-size: 10px;
  margin-top: 10px;
  padding-bottom: 10px;
  background-color: inherit;
  border-radius: 5px;
  & p {
    color: whitesmoke;
    font-weight: bold;
    margin: 0;
  }
`;

const NameDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 15px;
  font-size: 20px;
  font-weight: bold;
`;

export default Favourites;
