import { createBrowserRouter, RouterProvider } from "react-router";
import {
  LoginPage,
  ABMPage,
  CentroSaludPage,
  HomePage,
  AltaPage,
  EditPage,
} from "../containers";
import { SideMenuLayout } from "../components";

const index = () => {
  let router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: <SideMenuLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "abm-salud",
          element: <ABMPage />,
        },
        {
          path: "abm-salud/crear",
          element: <AltaPage />,
        },
        {
          path: "abm-salud/editar",
          element: <EditPage />,
        },
        {
          path: "disponibilidad",
          element: <CentroSaludPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default index;
