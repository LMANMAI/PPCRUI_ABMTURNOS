import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  Heading,
  Menu,
  Portal,
  Stack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { RiEqualizerFill } from "react-icons/ri";
import { FiMoreVertical } from "react-icons/fi";
import { TopbarCoponent, Table } from "../../components";
import { useNavigate, useParams } from "react-router";
import { Column } from "../../components/Table";

type Turno = {
  id: number;
  paciente: string;
  dni: string;
  hora: string; // p.e. "14:30"
  especialidad: string;
  estado: "CONFIRMADO" | "PENDIENTE" | "CANCELADO";
};

const mockTurnos: Turno[] = [
  {
    id: 1,
    paciente: "Juan Pérez",
    dni: "12.345.678",
    hora: "09:00",
    especialidad: "Cardiología",
    estado: "CONFIRMADO",
  },
  {
    id: 2,
    paciente: "María González",
    dni: "23.456.789",
    hora: "10:30",
    especialidad: "Pediatría",
    estado: "PENDIENTE",
  },
  {
    id: 3,
    paciente: "Carlos Ramírez",
    dni: "34.567.890",
    hora: "11:15",
    especialidad: "Traumatología",
    estado: "CANCELADO",
  },
];

export default function CentroSaludPage() {
  const { centroId } = useParams<{ centroId: string }>();
  const navigate = useNavigate();

  const turnoColumns: Column<Turno>[] = [
    { header: "Paciente", accessor: "paciente", textAlign: "left" },
    { header: "DNI", accessor: "dni", textAlign: "left" },
    { header: "Hora", accessor: "hora", textAlign: "center" },
    { header: "Especialidad", accessor: "especialidad", textAlign: "left" },
    { header: "Estado", accessor: "estadoBadge", textAlign: "center" },
    { header: "", accessor: "menu", textAlign: "center" },
  ];

  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTurnos(mockTurnos);
      setLoading(false);
    }, 500);
  }, []);

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
                  Ver detalle de turno
                </Box>
              </Menu.Item>
            </Box>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );

  // --- transformamos los datos para la tabla ---
  const tableData = turnos.map((t) => ({
    ...t,
    estadoBadge: (
      <Badge
        colorPalette={
          t.estado === "CONFIRMADO"
            ? "green"
            : t.estado === "PENDIENTE"
            ? "yellow"
            : "red"
        }
      >
        {t.estado}
      </Badge>
    ),
    menu: renderMenu(t.id),
  }));

  return (
    <Stack gap={6} px={6} pt={4}>
      {/* Topbar */}
      <TopbarCoponent
        title={{ name: "Turnos del Día" }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          {
            text: `Centro ${centroId}`,
            onClick: () => navigate(`/centros/${centroId}`),
          },
        ]}
      />

      {/* Cards */}
      <Stack direction="row" gap={4}>
        <Stack flex={1}>
          <Card.Root
            size="sm"
            bg="white"
            borderRadius="md"
            boxShadow="xs"
            border="1px solid"
            borderColor="gray.200"
          >
            <Card.Header>
              <Heading size="md">Gestionar campaña de vacunación</Heading>
            </Card.Header>
            <Card.Body color="fg.muted">
              {/* aquí va info opcional o texto descriptivo */}
            </Card.Body>
            <Card.Footer>
              <Button
                variant="plain"
                onClick={() => navigate("/abm-salud/crear-campaña")}
              >
                Gestionar campaña
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
          >
            <Card.Header>
              <Heading size="md">Reservar turno</Heading>
            </Card.Header>
            <Card.Body color="fg.muted">
              {/* texto descriptivo si lo necesitas */}
            </Card.Body>
            <Card.Footer>
              <Button
                variant="plain"
                onClick={() => navigate("/abm-salud/crear-programa-sanitario")}
              >
                Nuevo programa
              </Button>
            </Card.Footer>
          </Card.Root>
        </Stack>
      </Stack>

      {/* Filtro + Tabla de turnos */}
      <Stack>
        <Stack alignItems="flex-end">
          <Button
            variant="outline"
            // leftIcon={<RiEqualizerFill />}
            onClick={() => {
              /* abrir modal filtro */
            }}
          >
            Filtrar
          </Button>
        </Stack>

        {loading ? (
          <Box textAlign="center" py={10}>
            <Spinner size="lg" />
          </Box>
        ) : (
          <Table
            data={tableData}
            columns={turnoColumns}
            rowKey="id"
            onRowClick={(row) => console.log("Clic en fila", row)}
          />
        )}
      </Stack>
    </Stack>
  );
}
