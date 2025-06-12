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
      <Stack direction={"row"}>
        <Stack flex={1}>
          <Card.Root size="sm">
            <Card.Header>
              <Heading size="md"> Card - sm</Heading>
            </Card.Header>
            <Card.Body color="fg.muted">
              This is the card body. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </Card.Body>
          </Card.Root>
        </Stack>

        <Stack flex={1}>
          <Card.Root size="sm">
            <Card.Header>
              <Heading size="md"> Card - sm</Heading>
            </Card.Header>
            <Card.Body color="fg.muted">
              This is the card body. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </Card.Body>
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
