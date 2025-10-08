import React from "react";
import { Outlet, Navigate } from "react-router";
import { useAppSelector } from "../store";
import { selectIsAuthenticated, selectUser } from "../features/authSlice";

const PublicOnlyRoute: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  const expired = user
    ? new Date(user.accessTokenExpiresAt).getTime() <= Date.now()
    : true;

  return isAuthenticated && !expired ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicOnlyRoute;
