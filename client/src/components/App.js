import { useState } from "react";
import Profile from "./Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import Home from "./Home";
import Standings from "./Standings";
import Players from "./Players";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/players" element={<Players />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
