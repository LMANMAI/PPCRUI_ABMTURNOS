import { createBrowserRouter, RouterProvider } from "react-router";
import {
  LoginPage,
  ABMPage,
  CentroSaludPage,
  HomePage,
  AltaPage,
  EspecialidadesPage,
  HorariosPage,
  PersonalAltaPage,
  DocumentacionPage,
  CrearCampaniaScreen,
  ProgramaSanitarioScreen,
  AdministrarCampañasVacunacionScreen,
  AdministrarProgramaSanitarioScreen,
  SolicitudesScreen,
  PersonalPage,
} from "../containers";
import { SideMenuLayout } from "../components";
import DetailPage from "../containers/ABM/Detail";
import PublicOnlyRoute from "./PublicOnlyRoute";
import ProtectedRoute from "./protectedRoute";
const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <SideMenuLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "abm-salud", element: <ABMPage /> },
          {
            path: "abm-salud/solicitudes-pendientes",
            element: <SolicitudesScreen />,
          },
          { path: "abm-salud/crear", element: <AltaPage /> },
          { path: "abm-salud/personal", element: <PersonalAltaPage /> },
          {
            path: "abm-salud/campañas",
            element: <AdministrarCampañasVacunacionScreen />,
          },
          {
            path: "abm-salud/campañas/crear-campaña",
            element: <CrearCampaniaScreen />,
          },
          {
            path: "abm-salud/programas",
            element: <AdministrarProgramaSanitarioScreen />,
          },
          {
            path: "abm-salud/programas/crear-programa-sanitario",
            element: <ProgramaSanitarioScreen />,
          },
          { path: "abm-salud/detail/:id", element: <DetailPage /> },
          {
            path: "abm-salud/detail/:id/especialidades",
            element: <EspecialidadesPage />,
          },
          { path: "abm-salud/detail/:id/horarios", element: <HorariosPage /> },
          { path: "abm-salud/detail/:id/personal", element: <PersonalPage /> },
          {
            path: "abm-salud/detail/:id/documentacion",
            element: <DocumentacionPage />,
          },
          { path: "disponibilidad", element: <CentroSaludPage /> },
        ],
      },
    ],
  },
]);

export default function RoutesProvider() {
  return <RouterProvider router={router} />;
}
