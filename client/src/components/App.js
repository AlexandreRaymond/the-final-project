import { useState, useContext } from "react";
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
import { InfoContext } from "./InfoContext";

const App = () => {
  // Logics
  const {
    state: { logged },
  } = useContext(InfoContext);
  console.log("App Logs", logged);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/standings/nhl" element={<NHLStanding />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/teams/:id/roster" element={<Roster />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
