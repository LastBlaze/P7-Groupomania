// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Add your own authentication on the below line.
  const userLoggedIn = localStorage.userInfo;
  return userLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
