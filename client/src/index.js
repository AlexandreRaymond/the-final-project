import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { InfoProvider } from "./components/InfoContext";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-kklr63vusgqy1r4a.us.auth0.com"
      clientId="X3AqsxwSQKodgTdl3dI1cFFK72Avp6hX"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "http://hockeydokey",
        scope: "read:profile update:current_user_metadata view:user",
      }}
    >
      <InfoProvider>
        <App />
      </InfoProvider>
    </Auth0Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
