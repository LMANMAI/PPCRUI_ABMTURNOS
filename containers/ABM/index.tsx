import React from "react";
import { useUserAD } from "../../context/authContext";
import { TopbarCoponent } from "../../components";
import {
  Box,
  Button,
  Card,
  Heading,
  Stack,
  Menu,
  Portal,
  Badge,
  Drawer,
  CloseButton,
  Field,
  Select,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { Table } from "../../components/Table";
import { FiMoreVertical } from "react-icons/fi";
import { RiEqualizerFill } from "react-icons/ri";

interface Centro {
  id: number;
  name: string;
  address: string;
  zone: string;
  specialties: string;
  status: "ACTIVO" | "INACTIVO";
  menu: any;
}
export interface Column<T> {
  header: string;
  accessor: keyof T;
  textAlign?: "left" | "center" | "right";
}

const ABMPage = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { userAD } = useUserAD();
  let navigate = useNavigate();

  const columns: Column<Centro>[] = [
    { header: "Nombre del centro", accessor: "name", textAlign: "left" },
    { header: "Dirección", accessor: "address", textAlign: "left" },
    { header: "Zona", accessor: "zone", textAlign: "left" },
    { header: "Especialidades", accessor: "specialties", textAlign: "left" },
    { header: "Estado", accessor: "status", textAlign: "left" },
    { header: "", accessor: "menu", textAlign: "center" },
  ];

  const rawData = [
    {
      id: 1,
      name: "Centro de Salud N°1",
      address: "Av. Rivadavia 1200",
      zone: "Centro",
      specialties: "General, Pediatría",
      status: "ACTIVO",
    },
    {
      id: 2,
      name: "Hospital Sur",
      address: "Av. Mitre 2335",
      zone: "Sur",
      specialties: "General, Cardiología",
      status: "INACTIVO",
    },
    {
      id: 3,
      name: "Clínica Norte",
      address: "Calle Belgrano 4035",
      zone: "Norte",
      specialties: "General, Odontología",
      status: "ACTIVO",
    },
    {
      id: 4,
      name: "Hospital Municipal",
      address: "Ruta 12 km 3",
      zone: "Este",
      specialties: "General",
      status: "ACTIVO",
    },
  ];

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
                  Ver centro de salud
                </Box>
              </Menu.Item>
            </Box>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );

  const data = rawData.map((item) => ({
    ...item,
    menu: renderMenu(item.id),
    status: (
      <Badge colorPalette={item.status === "ACTIVO" ? "green" : "red"}>
        {item.status}
      </Badge>
    ),
  }));

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
            onClick: () => navigate("/abm-salud/crear"),
            variant: "solid",
            colorScheme: "teal",
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
          <Button
            variant="outline"
            width="fit-content"
            onClick={() => {
              setOpen(true);
            }}
          >
            Filtrar
            <RiEqualizerFill />
          </Button>
        </Stack>
        <Table
          data={data}
          columns={columns}
          rowKey="id"
          onRowClick={() => {}}
        />
      </Stack>
      {/* Pasar este drawer a un componente */}
      <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} size="sm">
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              {/* Header */}
              <Drawer.Header>
                <Drawer.Title>Filtros</Drawer.Title>
              </Drawer.Header>

              {/* Body con formularios */}
              <Drawer.Body>
                <Stack gap={4}>
                  {/* Buscar por nombre */}
                  <Field.Root>
                    <Field.Label>Buscar por nombre</Field.Label>
                    <Input placeholder="Ingrese un nombre" />
                  </Field.Root>

                  {/* Zona */}
                  <Field.Root required>
                    <Select.Root collection={[]} size="sm" width="320px">
                      <Select.HiddenSelect />
                      <Select.Label>Zona</Select.Label>
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText placeholder="Select framework" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content>
                            <Select.Item
                              item={"2"}
                              //key={framework.value}
                            >
                              2
                              <Select.ItemIndicator />
                            </Select.Item>
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  </Field.Root>

                  {/* Especialidad */}
                  <Field.Root>
                    <Field.Label>Especialidad</Field.Label>
                    <Select placeholder="Seleccione una especialidad">
                      <option value="pediatria">Pediatría</option>
                      <option value="cardiologia">Cardiología</option>
                      <option value="odontologia">Odontología</option>
                      <option value="traumatologia">Traumatología</option>
                    </Select>
                  </Field.Root>

                  {/* Estado */}
                  <Field.Root>
                    <Field.Label>Estado</Field.Label>
                    <Select placeholder="Seleccione un estado">
                      <option value="ACTIVO">Activo</option>
                      <option value="INACTIVO">Inactivo</option>
                    </Select>
                  </Field.Root>
                </Stack>
              </Drawer.Body>

              {/* Footer con botones */}
              <Drawer.Footer justifyContent="flex-start">
                <Button
                  colorScheme="teal"
                  mr={3}
                  onClick={() => {
                    // aquí llamás a tu lógica de aplicar filtros
                    setOpen(false);
                  }}
                >
                  Aplicar filtros
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    // reset de filtros si necesitás
                    setOpen(false);
                  }}
                >
                  Cerrar
                </Button>
              </Drawer.Footer>

              {/* Close Trigger */}
              <Drawer.CloseTrigger asChild>
                <CloseButton position="absolute" top="8px" right="8px" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Stack>
  );
};

export default ABMPage;
