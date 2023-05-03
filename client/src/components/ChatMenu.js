import { useState, useContext, useEffect } from "react";
import { User, useAuth0 } from "@auth0/auth0-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";
import axios from "axios";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { Spinner } from "./Home";
import {
  MainContainer,
  ButtonContainer,
  NavButton,
  NavBrowse,
  Wrapper,
} from "./Teams";

const ChatMenu = () => {
  const SpinnerIcon = withBaseIcon({ size: 50 });
  const { isAuthenticated } = useAuth0();

  const [teams, setTeams] = useState(null);

  useEffect(() => {
    axios.get(`/api/teams`).then((response) => {
      setTeams(response.data.teams.teams);
    });
  }, []);

  if (!teams) {
    return (
      <Spinner>
        <SpinnerIcon icon={spinner3} />
      </Spinner>
    );
  }

  return (
    <MainContainer>
      <h1>Filter through a team</h1>
      <ButtonContainer>
        {teams.sort().map((team) => {
          return (
            <Wrapper>
              <NavBrowse to={`/teams/${team.id}/chat`}>
                <NavButton>{team.name}</NavButton>
              </NavBrowse>
            </Wrapper>
          );
        })}
      </ButtonContainer>
    </MainContainer>
  );
};

export default ChatMenu;
