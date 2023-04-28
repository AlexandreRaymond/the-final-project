import { useState, useEffect, useContext } from "react";
import { InfoContext } from "./InfoContext";
import styled from "styled-components";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const DeleteComment = () => {
  const handleRemove = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <DeleteButton onClick={handleRemove}>X</DeleteButton>
    </>
  );
};

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

export default DeleteComment;
