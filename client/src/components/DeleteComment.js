import { useState, useContext } from "react";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";
import axios from "axios";
import { ModalDiv } from "./Roster";

const DeleteComment = ({ commentId }) => {
  const {
    actions: { setShouldUpdate, setShowToast },
  } = useContext(InfoContext);

  const [deleteModal, setDeleteModal] = useState(false);

  const checkModal = () => {
    if (deleteModal) {
      setDeleteModal(false);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();

    axios.delete(`/api/delete/comment/${commentId}`).then((response) => {
      setShowToast({
        isShowing: true,
        message: "Message successfuly deleted!",
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
            <div>Are you sure you want to delete this comment?</div>
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
  font-size: 13px;
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

export default DeleteComment;
