import { useState, useContext } from "react";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { ModalDiv } from "./Roster";

const RemoveFav = ({ player }) => {
  const {
    actions: { setShouldUpdate, setShowToast },
  } = useContext(InfoContext);

  const { user } = useAuth0();
  let preslice = user.sub;
  let userId = preslice.slice(6, preslice.length);

  const [deleteModal, setDeleteModal] = useState(false);

  let playerId = player.playerId;

  const checkModal = () => {
    if (deleteModal) {
      setDeleteModal(false);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();

    axios
      .patch(`/api/delete/favourites/${userId}`, { playerId: playerId })
      .then((response) => {
        setShowToast({
          isShowing: true,
          message: "Player successfuly deleted!",
          duration: 3000,
        });
        setShouldUpdate(true);
        setDeleteModal(false);
      });
  };

  return (
    <Wrapper onClick={() => checkModal()}>
      <DeleteButton
        onClick={() => {
          setDeleteModal(true);
          setShowToast(true);
        }}
      >
        X
      </DeleteButton>
      {deleteModal && (
        <ModalDiv>
          <DeleteInfo onClick={(e) => e.stopPropagation()}>
            <TextDiv>Are you sure you want to remove this player?</TextDiv>
            <ButtonDiv>
              <YButton onClick={handleRemove}>Yes</YButton>
              <NButton onClick={() => setDeleteModal(false)}>No</NButton>
            </ButtonDiv>
          </DeleteInfo>
        </ModalDiv>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const DeleteButton = styled.button`
  font-size: 15px;
  font-weight: bold;
  color: lightgray;
  border: none;
  background-color: inherit;
  &:hover {
    cursor: pointer;
    color: red;
  }
`;

const DeleteInfo = styled.div`
  background-color: whitesmoke;
  font-weight: bold;
  font-size: 14px;
  border-radius: 5px;
  height: 80px;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 100px;
`;

const YButton = styled.button`
  border: none;
  background-color: inherit;
  font-size: 18px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    color: red;
  }
`;

const NButton = styled.button`
  border: none;
  background-color: inherit;
  font-size: 18px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    color: green;
  }
`;

const TextDiv = styled.div`
  color: black;
`;

export default RemoveFav;
