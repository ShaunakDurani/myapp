// src/Components/ProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/" />;
  }

  // Otherwise, render the children (Browse page)
  return children;
};

export default ProtectedRoute;
