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
import { User, useAuth0 } from "@auth0/auth0-react";
import RequireAuth from "./RequireAuth";
import ChatMenu from "./ChatMenu";
import TeamChat from "./TeamChat";
import PlayerChat from "./PlayerChat";

const App = () => {
  // Logics

  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <RequireAuth>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/standings/nhl" element={<NHLStanding />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id/roster" element={<Roster />} />
          <Route path="/player/:id" element={<Player />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/chat" element={<ChatMenu />} />
          <Route path="/teams/:id/chat" element={<TeamChat />} />
          <Route path="/player/:id/chat" element={<PlayerChat />} />
        </Routes>
      </RequireAuth>
    </>
  );
};

export default App;
