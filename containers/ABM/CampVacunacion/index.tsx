import React, { useState } from "react";
import {
  Stack,
  Grid,
  GridItem,
  Input,
  Button,
  Text,
  Heading,
  Checkbox,
  CheckboxGroup,
  Badge,
  Portal,
  createListCollection,
  Select,
  Field,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { TopbarCoponent } from "../../../components";
import { ModuleBox } from "../../../components/ModuleBox";
//import { rawData } from "../../../containers/ABM/static";

export default function CrearCampaniaScreen() {
  const navigate = useNavigate();
  const activeCenters = /*rawData*/ [].filter((c) => c.status === "ACTIVO");

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCenters, setSelectedCenters] = useState<string[]>([]);

  const centersCollection = createListCollection({
    items: activeCenters.map((c) => ({
      label: c.name,
      value: String(c.id),
    })),
  });

  const handleSubmit = () => {
    console.log({
      name,
      startDate,
      endDate,
      centers: selectedCenters.map(Number),
    });
    navigate("/abm-salud");
  };

  return (
    <Stack px={6} py={8} gap={6}>
      <TopbarCoponent
        title={{ name: "Crear campaña de vacunación" }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Centros", onClick: () => navigate("/abm-salud") },
          { text: "Crear campaña", onClick: () => {} },
        ]}
      />

      <ModuleBox
        header={
          <Heading size="md">
            Completa los datos de la campaña y selecciona los centros
            involucrados
          </Heading>
        }
        footer={
          <Stack direction="row" gap={4}>
            <Button colorPalette="teal" onClick={handleSubmit}>
              Crear campaña
            </Button>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
          </Stack>
        }
      >
        <Grid templateColumns="4fr 8fr" gap={6} mb={6}>
          <GridItem>
            <Text fontWeight="600" fontSize="lg">
              Datos de la campaña
            </Text>
            <Text fontSize="sm" color="gray.600" mt={2}>
              Nombre y período de la campaña
            </Text>
          </GridItem>
          <GridItem>
            <Grid templateColumns="1fr 1fr" gap={4}>
              <Field.Root required>
                <Field.Label>Nombre de la campaña</Field.Label>
                <Input
                  placeholder="Vacunación Antigripal 2025"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Field.Root>
              <Field.Root required>
                <Field.Label>Fecha de inicio</Field.Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Field.Root>
              <Field.Root required>
                <Field.Label>Fecha de fin</Field.Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Field.Root>
            </Grid>
          </GridItem>
        </Grid>

        <Grid templateColumns="4fr 8fr" gap={6}>
          <GridItem>
            <Text fontWeight="600" fontSize="lg">
              Centros involucrados
            </Text>
            <Text fontSize="sm" color="gray.600" mt={2}>
              Selecciona uno o varios centros activos
            </Text>
          </GridItem>
          <GridItem>
            <Field.Root required>
              <Field.Label>Centros</Field.Label>

              <Select.Root
                collection={centersCollection}
                multiple
                onValueChange={(details) => setSelectedCenters(details.value)}
              >
                <Select.HiddenSelect multiple />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Seleccioná centros..." />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                    <Select.ClearTrigger />
                  </Select.IndicatorGroup>
                </Select.Control>

                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {centersCollection.items.map((item) => (
                        <Select.Item item={item} key={item.value}>
                          {item.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>

              {selectedCenters.length > 0 && (
                <Stack direction="row" gap={2} mt={2}>
                  {selectedCenters.map((val) => {
                    const centro = activeCenters.find(
                      (c) => String(c.id) === val
                    );
                    return (
                      <Badge key={val} colorScheme="teal">
                        {centro?.name}
                      </Badge>
                    );
                  })}
                </Stack>
              )}
            </Field.Root>
          </GridItem>
        </Grid>
      </ModuleBox>
    </Stack>
  );
}
