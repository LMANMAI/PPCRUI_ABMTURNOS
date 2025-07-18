import { createBrowserRouter, RouterProvider } from "react-router";
import {
  LoginPage,
  ABMPage,
  CentroSaludPage,
  HomePage,
  AltaPage,
  EspecialidadesPage,
  HorariosPage,
  PersonalPage,
  DocumentacionPage,
} from "../containers";
import { SideMenuLayout } from "../components";
import DetailPage from "../containers/ABM/Detail";

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
          path: "abm-salud/detail/:id",
          element: <DetailPage />,
        },

        {
          path: "/abm-salud/detail/:id/especialidades",
          element: <EspecialidadesPage />,
        },
        {
          path: "/abm-salud/detail/:id/horarios",
          element: <HorariosPage />,
        },

        {
          path: "/abm-salud/detail/:id/personal",
          element: <PersonalPage />,
        },
        {
          path: "/abm-salud/detail/:id/documentacion",
          element: <DocumentacionPage />,
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
