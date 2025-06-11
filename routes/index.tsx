import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { LoginPage, ABMPage } from "../containers";
import { useUserAD } from "../context/authContext";

const index = () => {
  const { authenticated } = useUserAD();

  let router = createBrowserRouter([
    {
      path: "/login",
      Component: LoginPage,
    },
    {
      path: "/",
      Component: authenticated ? ABMPage : LoginPage,
    },
    {
      path: "/abm-salud",
      Component: ABMPage,
    },
    {
      path: "/disponibilidad",
      Component: ABMPage,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default index;
