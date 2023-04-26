import { useState, createContext } from "react";

export const InfoContext = createContext(null);
export const InfoProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [yourProfile, setYourProfile] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentPic, setCurrentPic] = useState(null);
  const [currentStats, setCurrentStats] = useState(null);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [currentLogo, setCurrentLogo] = useState(null);
  const [currentRoster, setCurrentRoster] = useState(null);
  const [currentStanding, setCurrentStanding] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentComments, setCurrentComments] = useState(null);
  const [currentFocus, setCurrentFocus] = useState("stats");
  const [currentFav, setCurrentFav] = useState(null);
  const [copyrights, setCopyrights] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <InfoContext.Provider
      value={{
        state: {
          currentPlayer,
          currentTeam,
          logged,
          copyrights,
          currentStats,
          currentPic,
          currentFocus,
          currentLogo,
          currentRoster,
          modalOpen,
          currentStanding,
          currentChat,
          currentFav,
          currentComments,
          yourProfile,
        },
        actions: {
          setCurrentPlayer,
          setCurrentTeam,
          setLogged,
          setCopyrights,
          setCurrentStats,
          setCurrentPic,
          setCurrentFocus,
          setCurrentLogo,
          setCurrentRoster,
          setModalOpen,
          setCurrentStanding,
          setCurrentChat,
          setCurrentFav,
          setCurrentComments,
          setYourProfile,
        },
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
