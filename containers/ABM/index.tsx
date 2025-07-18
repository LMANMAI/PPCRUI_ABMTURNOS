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
  createListCollection,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { Table } from "../../components/Table";
import { FiMoreVertical } from "react-icons/fi";
import { RiEqualizerFill } from "react-icons/ri";
import { rawData } from "./static";
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
  const [filterName, setFilterName] = React.useState("");
  const [filterZone, setFilterZone] = React.useState<string>("");
  const [filterSpecialty, setFilterSpecialty] = React.useState<string>("");
  const [filterStatus, setFilterStatus] = React.useState<string>("");

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
  const zonas = ["Centro", "Norte", "Sur", "Este", "Oeste"];
  const especialidades = ["General", "Pediatría", "Cardiología", "Odontología"];
  const estados = ["ACTIVO", "INACTIVO"];

  const zonasCollection = createListCollection({
    items: zonas.map((z) => ({
      label: z,
      value: z,
    })),
  });

  const espCollection = createListCollection({
    items: especialidades.map((e) => ({
      label: e,
      value: e,
    })),
  });

  const estadosCollection = createListCollection({
    items: estados.map((s) => ({
      label: s,
      value: s,
    })),
  });

  console.log(estadosCollection);
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
              <Button
                variant={"plain"}
                color={"black"}
                onClick={() => {
                  navigate("/abm-salud/crear-campaña");
                }}
              >
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
              <Button
                variant={"plain"}
                color={"black"}
                onClick={() => {
                  navigate("/abm-salud/crear-programa-sanitario");
                }}
              >
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
              <Drawer.Header>
                <Drawer.Title>Filtros</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Stack gap={4}>
                  <Field.Root required>
                    <Field.Label>Buscar por nombre</Field.Label>
                    <Input
                      placeholder="Ingrese un nombre"
                      onChange={(e) => setFilterName(e.target.value)}
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>Zona</Field.Label>
                    <Select.Root
                      collection={zonasCollection}
                      size="md"
                      onValueChange={(details: any) =>
                        setFilterZone(details.value)
                      }
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText placeholder="Seleccione zona" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                          <Select.ClearTrigger />
                        </Select.IndicatorGroup>
                      </Select.Control>

                      <Portal>
                        <Select.Positioner>
                          <Select.Content zIndex="popover">
                            {zonasCollection.items.map((item) => (
                              <Select.Item item={item} key={item.value}>
                                {item.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>Especialidad</Field.Label>
                    <Select.Root
                      collection={espCollection}
                      size="md"
                      onValueChange={(details: any) =>
                        setFilterSpecialty(details.value)
                      }
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText placeholder="Seleccione especialidad" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                          <Select.ClearTrigger />
                        </Select.IndicatorGroup>
                      </Select.Control>

                      <Portal>
                        <Select.Positioner>
                          <Select.Content zIndex="popover">
                            {espCollection.items.map((item) => (
                              <Select.Item item={item} key={item.value}>
                                {item.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Estado</Field.Label>
                    <Select.Root
                      collection={estadosCollection}
                      size="md"
                      onValueChange={(details: any) =>
                        setFilterStatus(details.value)
                      }
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText placeholder="Seleccione estado" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                          <Select.ClearTrigger />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content zIndex="popover">
                            {estadosCollection.items.map((item) => (
                              <Select.Item item={item} key={item.value}>
                                {item.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  </Field.Root>
                </Stack>
              </Drawer.Body>

              <Drawer.Footer justifyContent="flex-start">
                <Button
                  colorPalette="teal"
                  mr={3}
                  onClick={() => setOpen(false)}
                >
                  Aplicar filtros
                </Button>
                <Button variant="outline" onClick={() => setOpen(false)}>
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
