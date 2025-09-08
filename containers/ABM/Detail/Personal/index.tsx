import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Stack,
  HStack,
  Input,
  Button,
  Icon,
  Heading,
  Text,
  Box,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { FiFilter, FiMoreVertical } from "react-icons/fi";
import { TopbarCoponent, Table } from "../../../../components";
import { Column } from "../../../../components/Table";

interface Profesional {
  id: number;
  name: string;
  role: string;
  specialty: string;
  schedule: string;
  status: "ACTIVO" | "INACTIVO";
  actions?: React.ReactNode;
}

// 2) Mock de datos (por ejemplo podrían venir de un fetch)
const mockProfesionales: Profesional[] = [
  {
    id: 1,
    name: "Dra. Ana García",
    role: "Médico Pediatra",
    specialty: "Pediatría",
    schedule: "Lun–Vie 9:00–15:00",
    status: "ACTIVO",
  },
  {
    id: 2,
    name: "Lic. Carlos Pérez",
    role: "Kinesiólogo",
    specialty: "Rehabilitación",
    schedule: "Mar y Jue 10:00–14:00",
    status: "ACTIVO",
  },
  {
    id: 3,
    name: "Dra. Laura Ruiz",
    role: "Odontóloga",
    specialty: "Odontología General",
    schedule: "Lun, Mié y Vie 8:00–12:00",
    status: "INACTIVO",
  },
  {
    id: 4,
    name: "Dr. Martín López",
    role: "Cardiólogo",
    specialty: "Cardiología",
    schedule: "Mié–Vie 14:00–18:00",
    status: "ACTIVO",
  },
];

export default function PersonalPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const centroId = Number(id);
  const [fEspecialidad, setFEspecialidad] = useState("");
  const [fRol, setFRol] = useState("");

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
                  onClick={() => navigate(`/administrar/detail/${id}`)}
                >
                  {"Opocion sobre el porfesional"}
                </Box>
              </Menu.Item>
            </Box>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );

  const columns: Column<Profesional>[] = [
    { header: "Nombre", accessor: "name", textAlign: "left" },
    { header: "Rol", accessor: "role", textAlign: "left" },
    { header: "Especialidad", accessor: "specialty", textAlign: "left" },
    { header: "Horario", accessor: "schedule", textAlign: "left" },
    { header: "Estado", accessor: "status", textAlign: "center" },
    { header: "", accessor: "actions", textAlign: "center" },
  ];

  const data = mockProfesionales
    .filter(
      (p) =>
        p.specialty.toLowerCase().includes(fEspecialidad.toLowerCase()) &&
        p.role.toLowerCase().includes(fRol.toLowerCase())
    )
    .map((p) => ({
      ...p,
      actions: renderMenu(p.id),
      status: (
        <Text
          as="span"
          fontSize="xs"
          fontWeight="bold"
          color={p.status === "ACTIVO" ? "green.600" : "red.600"}
        >
          {p.status}
        </Text>
      ),
    }));

  return (
    <Stack gap={6} px={6}>
      <TopbarCoponent
        title={{ name: `Personal del centro ${centroId}` }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Centros", onClick: () => navigate("/administrar") },
          {
            text: `Centro ${centroId}`,
            onClick: () => navigate(`/administrar/detail/${centroId}`),
          },
          { text: "Personal", onClick: () => {} },
        ]}
        buttonList={[]}
        menuOptions={[]}
      />

      <Text color="gray.600">
        Listado de profesionales asignados al centro. Puedes filtrar por
        especialidad o rol.
      </Text>

      <HStack gap={3}>
        <Input
          placeholder="Especialidad"
          value={fEspecialidad}
          onChange={(e) => setFEspecialidad(e.target.value)}
        />
        <Input
          placeholder="Rol"
          value={fRol}
          onChange={(e) => setFRol(e.target.value)}
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
          variant="line"
        />
      </Box>
    </Stack>
  );
}
