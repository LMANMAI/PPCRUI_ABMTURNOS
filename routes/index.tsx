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
  RegistroPacientePage,
  CrearTurnoPage,
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
          { path: "administrar", element: <ABMPage /> },
          {
            path: "administrar/solicitudes-pendientes",
            element: <SolicitudesScreen />,
          },
          { path: "administrar/crear", element: <AltaPage /> },
          { path: "administrar/personal", element: <PersonalAltaPage /> },
          {
            path: "administrar/campañas",
            element: <AdministrarCampañasVacunacionScreen />,
          },
          {
            path: "administrar/campañas/crear-campaña",
            element: <CrearCampaniaScreen />,
          },
          {
            path: "administrar/programas",
            element: <AdministrarProgramaSanitarioScreen />,
          },
          {
            path: "administrar/programas/crear-programa-sanitario",
            element: <ProgramaSanitarioScreen />,
          },
          { path: "administrar/detail/:id", element: <DetailPage /> },
          {
            path: "administrar/detail/:id/especialidades",
            element: <EspecialidadesPage />,
          },
          {
            path: "administrar/detail/:id/horarios",
            element: <HorariosPage />,
          },
          {
            path: "administrar/detail/:id/personal",
            element: <PersonalPage />,
          },
          {
            path: "administrar/detail/:id/documentacion",
            element: <DocumentacionPage />,
          },
          { path: "sanatorio", element: <CentroSaludPage /> },
          {
            path: "sanatorio/agregar-paciente",
            element: <RegistroPacientePage />,
          },
          {
            path: "sanatorio/reservar-turno",
            element: <CrearTurnoPage />,
          },
        ],
      },
    ],
  },
]);

export default function RoutesProvider() {
  return <RouterProvider router={router} />;
}
