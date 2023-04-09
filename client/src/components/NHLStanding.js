import { useState, useEffect } from "react";
import { MainContainer } from "./Teams";

const NHLStanding = () => {
  const [standing, setStanding] = useState(null);

  return (
    <MainContainer>
      <div>
        <h1>NHL Standing</h1>
      </div>
      <div></div>
    </MainContainer>
  );
};

export default NHLStanding;
