import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../store";
import { selectIsAuthenticated } from "../features/authSlice";

const ProtectedRoute = () => {
  const authenticated = useAppSelector(selectIsAuthenticated);
  console.log(
    useAppSelector((s: any) => s.auth.authenticated),
    "useAppSelector((s: any) => s.auth.authenticated)"
  );

  console.log(
    useAppSelector((s: any) => s.auth),
    "useAppSelector((s: any) => s.auth)"
  );

  //  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
