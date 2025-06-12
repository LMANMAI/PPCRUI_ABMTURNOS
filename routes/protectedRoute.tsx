import React from "react";
import { Navigate, Outlet } from "react-router";
import { useUserAD } from "../context/authContext";

const ProtectedRoute = () => {
  const { authenticated } = useUserAD();

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
