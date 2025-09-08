import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  Heading,
  Menu,
  Portal,
  Stack,
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
  hora: string;
  especialidad: string;
  estado: "CONFIRMADO" | "PENDIENTE" | "CANCELADO";
};

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
                  Ver detalle de turno
                </Box>
              </Menu.Item>
            </Box>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
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

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <Stack gap={6} px={6} pt={4}>
      <TopbarCoponent
        title={{ name: "Hospital Municipal" }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          {
            text: `Hospital Municipal`,
            onClick: () => navigate(`/centros/${centroId}`),
          },
        ]}
        menuOptions={[
          {
            label: "Registrar usuario",
            onClick: () => {
              navigate(`/sanatorio/agregar-paciente`);
            },
          },
        ]}
      />

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
              Administra la campaña de vacunación o revisa si este centro esta
              habilitado
            </Card.Body>
            <Card.Footer>
              <Button
                variant="plain"
                onClick={() => {
                  // navigate("/administrar/crear-campaña");
                }}
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
              Reserva un turno para usuarios sin aplicacion
            </Card.Body>
            <Card.Footer>
              <Button
                variant="plain"
                onClick={() => navigate("reservar-turno")}
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
            onClick={() => {
              /* abrir modal filtro */
            }}
          >
            <RiEqualizerFill /> Filtrar
          </Button>
        </Stack>

        <Table
          data={tableData}
          columns={turnoColumns}
          rowKey="id"
          loading={loading}
          onRowClick={(row) => console.log("Clic en fila", row)}
          loadingText="Obteniendo el listado de los turnos del sanatorio"
          emptyStateText="No se encontraron turnos para el dia de hoy"
          variant="outline"
          dataSize={5}
        />
      </Stack>
    </Stack>
  );
}
