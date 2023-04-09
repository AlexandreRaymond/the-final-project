import { useState } from "react";
import Profile from "./Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import Home from "./Home";
import Standings from "./Standings";
import Teams from "./Teams";
import Login from "./Login";
import Favourites from "./Favourites";
import Roster from "./Roster";
import Player from "./Player";
import NHLStanding from "./NHLStanding";

const App = () => {
  // Logics
  const [loggedIn, setLoggedIn] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("modalApp", modalOpen);

  if (loggedIn === false) {
    return (
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/standings/nhl" element={<NHLStanding />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route
          path="/teams/:id/roster"
          element={<Roster modalOpen={modalOpen} setModalOpen={setModalOpen} />}
        />
        <Route
          path="/player/:id"
          element={<Player modalOpen={modalOpen} setModalOpen={setLoggedIn} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
