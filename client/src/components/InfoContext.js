import { useState, createContext } from "react";

export const InfoContext = createContext(null);
export const InfoProvider = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [logged, setLogged] = useState(false);

  return (
    <InfoContext.Provider
      value={{
        state: { currentPlayer, currentTeam, logged },
        actions: { setCurrentPlayer, setCurrentTeam, setLogged },
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
