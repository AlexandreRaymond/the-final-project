import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { InfoContext } from "./InfoContext";
import { withBaseIcon } from "react-icons-kit";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { Spinner } from "./Home";

const PlayerCard = ({ player }) => {
  console.log("Tempest", player);
  const {
    state: { currentRoster },
  } = useContext(InfoContext);

  return (
    <>
      <div>PlayerCard</div>
    </>
  );
};

export default PlayerCard;
