import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  let auth = useAuth0();
  let location = useLocation();
  console.log("auth obj", auth);
  if (!auth.isAuthenticated && !auth.isLoading) {
    //return <Navigate to="/" state={{ from: location }} replace />;
    return null;
  }
  if (!auth.isAuthenticated && auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.isAuthenticated) {
    return children;
  }

  return null;
};

export default RequireAuth;
