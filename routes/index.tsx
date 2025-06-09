import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { LoginPage, ABMPage } from "../containers";

const index = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  let router = createBrowserRouter([
    {
      path: "/login",
      Component: LoginPage,
    },
    {
      path: "/",
      Component: authenticated ? ABMPage : LoginPage,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default index;
