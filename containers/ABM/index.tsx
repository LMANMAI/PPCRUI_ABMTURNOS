import React from "react";
import { useUserAD } from "../../context/authContext";
import { TopbarCoponent } from "../../components";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const ABMPage = () => {
  const { userAD } = useUserAD();

  console.log(userAD, "userAD");
  let navigate = useNavigate();

  return (
    <div>
      <TopbarCoponent
        title={{ name: "Disponibilidad de cajas de seguridad" }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Stock", onClick: () => navigate("/abm-salud") },
        ]}
        buttonList={[
          {
            text: "Gestionar",
            onClick: () => console.log("Gestionar"),
            variant: "solid",
            colorScheme: "teal",
          },
          {
            text: "Crear",
            onClick: () => navigate("/abm-salud/crear"),
            variant: "outline",
            colorScheme: "teal",
          },
        ]}
        menuOptions={[
          {
            label: "editar",
            onClick: () => navigate("/abm-salud/editar"),
          },
        ]}
      />
      {/* <SideMenuLayout>
        
      </SideMenuLayout> ABMPage */}
      asd
    </div>
  );
};

export default ABMPage;
