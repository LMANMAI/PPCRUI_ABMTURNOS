import { TopbarCoponent } from "../../../components";
import { Stack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";

const PersonalAltaPage = () => {
  let navigate = useNavigate();

  return (
    <Stack gap={6} px={6}>
      <TopbarCoponent
        title={{ name: "Gestión de Centros de Salud" }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Centros", onClick: () => navigate("/abm-salud") },
        ]}
        menuOptions={[
          {
            label: "Solicitudes pendientes",
            onClick: () => {
              navigate("/abm-salud/solicitudes-pendientes");
            },
          },
          {
            label: "Agregar personal",
            onClick: () => {
              navigate("/abm-salud/personal");
            },
          },
        ]}
        buttonList={[
          {
            text: "Crear centro de salud",
            onClick: () => navigate("/abm-salud/crear"),
            variant: "solid",
            colorScheme: "teal",
          },
        ]}
      />
    </Stack>
  );
};

export default PersonalAltaPage;
