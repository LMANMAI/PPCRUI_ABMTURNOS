import React, { useState } from "react";
import {
  Stack,
  Grid,
  GridItem,
  Input,
  Textarea,
  Button,
  Text,
  Heading,
  Field,
  Checkbox,
  CheckboxGroup,
  Badge,
  Portal,
  createListCollection,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { TopbarCoponent } from "../../../../components";
import { ModuleBox } from "../../../../components/ModuleBox";

const poblaciones = [
  { label: "Adultos mayores", value: "mayores" },
  { label: "Niños", value: "ninos" },
  { label: "Embarazadas", value: "embarazadas" },
  { label: "Diabéticos", value: "diabetes" },
  { label: "Hipertensos", value: "hipertensos" },
];

export default function ProgramaSanitarioScreen() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [targets, setTargets] = useState<string[]>([]);

  const targetsCollection = createListCollection({ items: poblaciones });

  const handleSubmit = () => {
    console.log({ name, description, startDate, endDate, targets });

    navigate("/abm-salud//programas");
  };

  return (
    <Stack px={6} gap={6}>
      <TopbarCoponent
        title={{ name: "Crear programa sanitario" }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Centros", onClick: () => navigate("/abm-salud") },
          {
            text: "Administrar programas",
            onClick: () => {
              navigate("/abm-salud/programas");
            },
          },
          { text: "Programa sanitario", onClick: () => {} },
        ]}
      />

      <ModuleBox
        header={
          <Heading size="md">
            Generá programas de seguimiento en salud para distintas poblaciones
          </Heading>
        }
        footer={
          <Stack direction="row" gap={4}>
            <Button colorPalette="teal" onClick={handleSubmit}>
              Crear programa
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
              Datos del programa
            </Text>
            <Text fontSize="sm" color="gray.600" mt={2}>
              Completá nombre, descripción y fechas
            </Text>
          </GridItem>
          <GridItem>
            <Grid templateColumns="1fr" gap={4}>
              <Field.Root required>
                <Field.Label>Nombre del programa</Field.Label>
                <Input
                  placeholder="Ej: Seguimiento de tensión arterial"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Descripción</Field.Label>
                <Textarea
                  placeholder="Objetivo y alcance del programa"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Field.Root>

              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Field.Root required>
                  <Field.Label>Fecha de inicio</Field.Label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Fecha de fin</Field.Label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Field.Root>
              </Grid>
            </Grid>
          </GridItem>
        </Grid>

        <Grid templateColumns="4fr 8fr" gap={6}>
          <GridItem>
            <Text fontWeight="600" fontSize="lg">
              Población objetivo
            </Text>
            <Text fontSize="sm" color="gray.600" mt={2}>
              Seleccioná a quiénes va dirigido este programa
            </Text>
          </GridItem>
          <GridItem>
            <Field.Root required>
              <Field.Label>Grupos</Field.Label>

              <Select.Root
                collection={targetsCollection}
                multiple
                onValueChange={(details) => setTargets(details.value)}
              >
                <Select.HiddenSelect multiple />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Seleccioná grupos" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                    <Select.ClearTrigger />
                  </Select.IndicatorGroup>
                </Select.Control>

                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {targetsCollection.items.map((item) => (
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

            {targets.length > 0 && (
              <Stack direction="row" gap={2} mt={2}>
                {targets.map((val) => {
                  const pop = poblaciones.find((p) => p.value === val);
                  return (
                    <Badge key={val} colorScheme="teal">
                      {pop?.label}
                    </Badge>
                  );
                })}
              </Stack>
            )}
          </GridItem>
        </Grid>
      </ModuleBox>
    </Stack>
  );
}
