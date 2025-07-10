import React from "react";
import { useUserAD } from "../../context/authContext";
import { TopbarCoponent } from "../../components";
import { Box, Button, Card, Heading, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { Table } from "../../components/Table";
interface Column<T> {
  header: string;
  accessor?: string;
  textAlign?: "left" | "right" | "center";
}
const ABMPage = () => {
  const { userAD } = useUserAD();
  let navigate = useNavigate();

  const columns: Column<{
    id: number;
    name: string;
    category: string;
    price: string;
  }>[] = [
    { header: "Product", accessor: "name", textAlign: "center" },
    { header: "Category", accessor: "category", textAlign: "center" },
    { header: "Price", accessor: "price", textAlign: "right" },
  ];

  const data = [
    { id: 1, name: "Laptop", category: "Electronics", price: "$999.99" },
    { id: 2, name: "Chair", category: "Furniture", price: "$150.00" },
    { id: 1, name: "Laptop", category: "Electronics", price: "$999.99" },
    { id: 2, name: "Chair", category: "Furniture", price: "$150.00" },
    { id: 1, name: "Laptop", category: "Electronics", price: "$999.99" },
    { id: 2, name: "Chair", category: "Furniture", price: "$150.00" },
  ];

  return (
    <Stack gap={6} px={6}>
      <TopbarCoponent
        title={{ name: "Gestión de Centros de Salud" }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Centros", onClick: () => navigate("/abm-salud") },
        ]}
        buttonList={[
          {
            text: "Crear centro de salud",
            onClick: () => console.log("Gestionar"),
            variant: "solid",
            colorScheme: "teal",
          },
        ]}
        menuOptions={[
          {
            label: "Ver historial de cambios",
            onClick: () => navigate("/abm-salud/editar"),
          },
          {
            label: "Desactivar centro",
            onClick: () => navigate("/abm-salud/editar"),
          },
          {
            label: "Duplicar centro",
            onClick: () => navigate("/abm-salud/editar"),
          },
          {
            label: "Eliminar centro",
            onClick: () => navigate("/abm-salud/editar"),
          },
        ]}
      />
      <Stack direction={"row"}>
        <Stack flex={1}>
          <Card.Root
            size="sm"
            bg="white"
            borderRadius="md"
            boxShadow="xs"
            border="1px solid"
            borderColor="gray.200"
            color={"black"}
          >
            <Card.Header>
              <Heading size="md"> Crear campaña de vacunación</Heading>
            </Card.Header>
            <Card.Body color="fg.muted">
              Organizá campañas masivas y asigná profesionales para vacunar a la
              población.
            </Card.Body>
            <Card.Footer>
              <Button variant={"plain"} color={"black"}>
                Crear campaña
              </Button>
            </Card.Footer>
          </Card.Root>
        </Stack>

        <Stack flex={1}>
          <Card.Root
            size="sm"
            bg="white"
            borderRadius="md"
            boxShadow="xs"
            border="1px solid"
            borderColor="gray.200"
            color={"black"}
          >
            <Card.Header>
              <Heading size="md">Programa sanitario</Heading>
            </Card.Header>
            <Card.Body color="fg.muted">
              Generá programas de seguimiento en salud para distintas
              poblaciones.
            </Card.Body>

            <Card.Footer>
              <Button variant={"plain"} color={"black"}>
                Nuevo programa
              </Button>
            </Card.Footer>
          </Card.Root>
        </Stack>
      </Stack>

      <Stack>
        <Stack alignItems={"end"}>
          <Button variant="solid" colorPalette="cyan" width="fit-content">
            Filtrar
          </Button>
        </Stack>
        <Table
          data={data}
          columns={columns}
          rowKey="id"
          onRowClick={() => {}}
        />
      </Stack>
    </Stack>
  );
};

export default ABMPage;
