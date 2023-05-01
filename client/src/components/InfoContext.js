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
  const [yourComment, setYourComment] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [adminPost, setAdminPost] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [showToast, setShowToast] = useState({
    isShowing: false,
    message: "",
    duration: 3000,
  });

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
          yourComment,
          editedComment,
          shouldUpdate,
          showToast,
          adminPost,
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
          setYourComment,
          setEditedComment,
          setShouldUpdate,
          setShowToast,
          setAdminPost,
        },
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
