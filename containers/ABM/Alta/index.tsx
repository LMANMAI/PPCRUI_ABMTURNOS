import React from "react";
import { TopbarCoponent } from "../../../components";
import { useNavigate } from "react-router";
import { Button, Heading, Stack, Grid, GridItem } from "@chakra-ui/react";
import { ModuleBox } from "../../../components/ModuleBox";

const AltaPage = () => {
  let navigate = useNavigate();

  return (
    <Stack px={6}>
      <TopbarCoponent
        title={{ name: "Crear centro de salud" }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Centros", onClick: () => navigate("/abm-salud") },
          {
            text: "Nuevo centro",
            onClick: () => navigate("/abm-salud/crearz"),
          },
        ]}
      />
      <ModuleBox
        header={
          <Heading size="md">
            Completá la información y confirmá para registrar el arqueo
          </Heading>
        }
        footer={
          <Stack flexDirection={"row"}>
            <Button colorPalette="teal" mr={3}>
              Confirmar
            </Button>
            <Button variant="outline">Cancelar</Button>
          </Stack>
        }
      >
        <Grid templateColumns="repeat(12, 1fr)" gap="6">
          <GridItem colSpan={4}>asd</GridItem>
          <GridItem colSpan={8}>asd</GridItem>
        </Grid>
      </ModuleBox>
    </Stack>
  );
};

export default AltaPage;
