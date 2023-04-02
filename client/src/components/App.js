import { useState } from "react";
import Profile from "./Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import Home from "./Home";
import Standings from "./Standings";
import Players from "./Players";
import Login from "./Login";

const App = () => {
  // Logics
  const [loggedIn, setLoggedIn] = useState(false);

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
        <Route path="/players" element={<Players />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
