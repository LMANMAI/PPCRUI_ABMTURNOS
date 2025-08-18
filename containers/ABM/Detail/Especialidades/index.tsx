import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Stack,
  HStack,
  Input,
  Button,
  Icon,
  Box,
  Text,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { FiFilter, FiMoreVertical } from "react-icons/fi";
import { TopbarCoponent, Table } from "../../../../components";
import { Column } from "../../../../components/Table";
import { rawData, Centro } from "./static";

interface Especialidad {
  id: number;
  name: string;
  code: string;
  description: string;
  status: "ACTIVA" | "INACTIVA";
  actions?: React.ReactNode;
}

// mock de especialidades
const mockEspecialidades: Especialidad[] = [
  {
    id: 1,
    name: "Pediatría",
    code: "PED",
    description: "Atención médica de bebés, niños y adolescentes.",
    status: "ACTIVA",
  },
  {
    id: 2,
    name: "Cardiología",
    code: "CAR",
    description: "Diagnóstico y tratamiento de enfermedades del corazón.",
    status: "ACTIVA",
  },
  {
    id: 3,
    name: "Odontología",
    code: "ODO",
    description: "Cuidado bucodental y salud oral.",
    status: "INACTIVA",
  },
  {
    id: 4,
    name: "Traumatología",
    code: "TRA",
    description: "Tratamiento de lesiones musculoesqueléticas.",
    status: "ACTIVA",
  },
];

export default function EspecialidadesPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const centroId = Number(id);
  const centro = rawData.find((c) => c.id === centroId) as Centro;

  const [filterName, setFilterName] = useState("");
  const renderMenu = (id: number) => (
    <Menu.Root>
      <Menu.Trigger>
        <Button
          size="sm"
          variant="plain"
          color="black"
          aria-label="Opciones"
          px={2}
          minW="auto"
        >
          <FiMoreVertical />
        </Button>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content asChild>
            <Box
              bg="white"
              borderRadius="md"
              boxShadow="md"
              py={2}
              minW="auto"
              border="1px solid"
              borderColor="gray.200"
            >
              <Menu.Item key={id} value={"Ver centro de salud"} asChild>
                <Box
                  px={4}
                  py={2}
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  fontWeight={"normal"}
                  color={"gray.800"}
                  onClick={() => navigate(`/abm-salud/detail/${id}`)}
                >
                  {"Opcion sobre la especialidad"}
                </Box>
              </Menu.Item>
            </Box>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );

  const columns: Column<Especialidad>[] = [
    { header: "Nombre", accessor: "name", textAlign: "left" },
    { header: "Código", accessor: "code", textAlign: "center" },
    { header: "Descripción", accessor: "description", textAlign: "left" },
    { header: "Estado", accessor: "status", textAlign: "center" },
    { header: "", accessor: "actions", textAlign: "center" },
  ];

  const data = mockEspecialidades
    .filter((e) => e.name.toLowerCase().includes(filterName.toLowerCase()))
    .map((e) => ({
      ...e,
      status: (
        <Text
          as="span"
          fontSize="xs"
          fontWeight="bold"
          color={e.status === "ACTIVA" ? "green.600" : "red.600"}
        >
          {e.status}
        </Text>
      ),
      actions: renderMenu(e.id),
    }));

  return (
    <Stack gap={6} px={6}>
      <TopbarCoponent
        title={{ name: `Especialidades de ${centro.name}` }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Centros", onClick: () => navigate("/abm-salud") },
          {
            text: centro.name,
            onClick: () => navigate(`/abm-salud/detail/${centroId}`),
          },
          { text: "Especialidades", onClick: () => {} },
        ]}
      />
      <Text color="gray.600">
        Listado de especialidades habilitadas en este centro. Puedes filtrar por
        nombre.
      </Text>

      <HStack gap={3}>
        <Input
          placeholder="Buscar especialidad"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <Button variant="outline" onClick={() => {}}>
          Filtrar <Icon as={FiFilter} ml={2} />
        </Button>
      </HStack>

      <Box
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        overflow="auto"
      >
        <Table
          columns={columns}
          data={data}
          rowKey="id"
          size="md"
          variant="simple"
        />
      </Box>
    </Stack>
  );
}
