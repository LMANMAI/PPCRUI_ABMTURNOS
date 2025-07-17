import React from "react";
import { TopbarCoponent } from "../../../components";
import { useNavigate } from "react-router";
import {
  Button,
  Heading,
  Stack,
  Grid,
  GridItem,
  Text,
  Field,
  Input,
  Select,
  Textarea,
  Portal,
  createListCollection,
} from "@chakra-ui/react";
import { ModuleBox } from "../../../components/ModuleBox";

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});

const AltaPage = () => {
  let navigate = useNavigate();
  const [step, setStep] = React.useState(1);

  return (
    <Stack px={6}>
      <TopbarCoponent
        title={{ name: "Crear centro de salud" }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Centros", onClick: () => navigate("/abm-salud") },
          {
            text: "Nuevo centro",
            onClick: () => navigate("/abm-salud/crearz"),
          },
        ]}
      />
      <ModuleBox
        header={
          <Heading size="md">
            Completá la información del centro de salud que querés dar de alta
          </Heading>
        }
        footer={
          <Stack flexDirection={"row"}>
            {step === 2 && (
              <Button variant="outline" onClick={() => setStep(1)}>
                Volver
              </Button>
            )}
            {step === 1 ? (
              <Button colorScheme="teal" onClick={() => setStep(2)}>
                Continuar
              </Button>
            ) : (
              <Button colorScheme="teal" onClick={() => console.log("Enviar")}>
                Crear centro
              </Button>
            )}
          </Stack>
        }
      >
        {step === 1 && (
          <>
            <Grid templateColumns="repeat(12, 1fr)" gap="6">
              <GridItem colSpan={4}>
                <Heading size="md">Información del centro</Heading>
                <Text mb="3" fontSize="md" color="fg.muted">
                  Completá los datos generales del establecimiento.
                </Text>
              </GridItem>
              <GridItem colSpan={8}>
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                  <Field.Root required>
                    <Field.Label>Nombre del centro</Field.Label>
                    <Input placeholder="Ej: Hospital Municipal Ituzaingó" />
                  </Field.Root>
                  <Field.Root required>
                    <Select.Root
                      collection={frameworks}
                      size="sm"
                      width="320px"
                    >
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
                            {frameworks.items.map((framework) => (
                              <Select.Item
                                item={framework}
                                key={framework.value}
                              >
                                {framework.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>Capacidad de consultorios</Field.Label>
                    <Input placeholder="Ej: 6" type="number" />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>Dirección</Field.Label>
                    <Input placeholder="Ej: Av. Rivadavia 1200" />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Descripción</Field.Label>
                    <Textarea placeholder="Ej: Centro de salud con guardia 24 hs y especialidades básicas." />
                  </Field.Root>
                </Grid>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(12, 1fr)" gap="6" mt={10}>
              <GridItem colSpan={4}>
                <Heading size="md">Datos de contacto</Heading>
                <Text mb="3" fontSize="md" color="fg.muted">
                  Información para la comunicación directa con el centro.
                </Text>
              </GridItem>
              <GridItem colSpan={8}>
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                  <Field.Root required>
                    <Field.Label>Teléfono</Field.Label>
                    <Input placeholder="Ej: +54 11 4455-6789" />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>Correo electrónico</Field.Label>
                    <Input placeholder="Ej: contacto@salud.ituzaingo.gob.ar" />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Horarios de atención</Field.Label>
                    <Input placeholder="Ej: Lunes a viernes de 8 a 17 hs" />
                  </Field.Root>
                </Grid>
              </GridItem>
            </Grid>
          </>
        )}

        {step === 2 && (
          <>
            <Grid templateColumns="repeat(12, 1fr)" gap="6" mt={10}>
              <GridItem colSpan={4}>
                <Heading size="md">Datos del responsable medico</Heading>
                <Text mb="3" fontSize="md" color="fg.muted">
                  Completá los datos del profesional responsable del centro,
                  según los requisitos del Ministerio de Salud.
                </Text>
              </GridItem>
              <GridItem colSpan={8}>
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                  <Field.Root required>
                    <Field.Label>Nombre completo</Field.Label>
                    <Input placeholder="Ej: Dra. María Rodríguez" />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>Teléfono institucional</Field.Label>
                    <Input placeholder="Ej: +54 11 4455-7890" />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>Matrícula profesional</Field.Label>
                    <Input placeholder="Ej: MN 123456" />
                  </Field.Root>
                </Grid>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(12, 1fr)" gap="6" mt={10}>
              <GridItem colSpan={4}>
                <Heading size="md">Documentación requerida</Heading>
                <Text mb="3" fontSize="md" color="fg.muted">
                  Adjuntá los archivos necesarios para su habilitación.
                </Text>
              </GridItem>
              <GridItem colSpan={8}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <Field.Root height={"fit-content"}>
                    <Field.Label>Habilitación municipal</Field.Label>
                    <Input type="file" padding={2} />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Plano aprobado</Field.Label>
                    <Input type="file" padding={2} />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Protocolo de atención</Field.Label>
                    <Input type="file" padding={2} />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Otros documentos</Field.Label>
                    <Input type="file" padding={2} />
                  </Field.Root>
                </Grid>
              </GridItem>
            </Grid>
          </>
        )}
      </ModuleBox>
    </Stack>
  );
};

export default AltaPage;
