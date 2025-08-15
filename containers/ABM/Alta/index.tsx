import React from "react";
import {
  TopbarCoponent,
  FormFieldInput,
  FormFieldSelect,
} from "../../../components";
import { useNavigate } from "react-router";
import {
  Button,
  Heading,
  Stack,
  Grid,
  GridItem,
  Text,
  Separator,
} from "@chakra-ui/react";
import { ModuleBox } from "../../../components/ModuleBox";
import { diasOptions, horas24Options, zonasOptions } from "./statics";

const AltaPage = () => {
  let navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({
    name: "",
    zone: "",
    capacity: "",
    address: "",
    description: "",
    phone: "",
    email: "",
    hours: "",
    respName: "",
    respPhone: "",
    respMatricula: "",
    dayStart: "",
    dayEnd: "",
    hourStart: "",
    hourEnd: "",
    lat: "",
    lng: "",
    municipalPermit: null as File | null,
    approvedPlan: null as File | null,
    protocolFile: null as File | null,
    otherDocs: null as File | null,
  });

  return (
    <Stack px={6}>
      <TopbarCoponent
        title={{ name: "Crear centro de salud" }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Centros", onClick: () => navigate("/abm-salud") },
          { text: "Nuevo centro", onClick: () => navigate("/abm-salud/crear") },
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
            {step === 1 ? (
              <Button colorPalette="teal" onClick={() => setStep(2)}>
                Continuar
              </Button>
            ) : (
              <Button
                colorPalette="teal"
                onClick={() => console.log("Enviar", form)}
              >
                Crear centro
              </Button>
            )}
            {step === 2 && (
              <Button variant="outline" onClick={() => setStep(1)}>
                Volver
              </Button>
            )}
          </Stack>
        }
      >
        {step === 1 && (
          <>
            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
              <GridItem colSpan={{ base: 12, lg: 4 }}>
                <Heading size="md">Información del centro</Heading>
                <Text mb="3" fontSize="md" color="fg.muted">
                  Completá los datos generales del establecimiento.
                </Text>
              </GridItem>

              <GridItem colSpan={{ base: 12, lg: 8 }}>
                <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                  <GridItem colSpan={{ base: 4, md: 4 }}>
                    <FormFieldInput
                      required
                      label="Nombre del centro"
                      placeholder="Ej: Hospital Municipal Ituzaingó"
                      value={form.name}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, name: e.target.value }))
                      }
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 4, md: 4 }}>
                    <FormFieldSelect
                      required
                      label="Zona"
                      options={zonasOptions}
                      placeholder="Seleccione zona"
                      size="sm"
                      variant="outline"
                      value={form.zone}
                      onChange={(v) =>
                        setForm((s) => ({ ...s, zone: v as string }))
                      }
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 4, md: 4 }}>
                    <FormFieldInput
                      required
                      label="Capacidad de consultorios"
                      placeholder="Ej: 6"
                      type="number"
                      value={form.capacity}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, capacity: e.target.value }))
                      }
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 4 }}>
                    <FormFieldInput
                      required
                      label="Dirección"
                      placeholder="Ej: Av. Rivadavia 1200"
                      value={form.address}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, address: e.target.value }))
                      }
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 4, md: 4 }}>
                    <FormFieldInput
                      required
                      label="Latitud"
                      placeholder="Ej: -34.123456"
                      value={form.address}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, address: e.target.value }))
                      }
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 4, md: 4 }}>
                    <FormFieldInput
                      required
                      label="Longitud"
                      placeholder="Ej: -58.123456"
                      value={form.address}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, address: e.target.value }))
                      }
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 12 }}>
                    <FormFieldInput
                      label="Descripción"
                      placeholder="Ej: Centro de salud con guardia 24 hs y especialidades básicas."
                      textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, description: e.target.value }))
                      }
                    />
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>

            <Separator margin={5} />

            <Grid templateColumns="repeat(12, 1fr)" gap={6} mt={10}>
              <GridItem colSpan={{ base: 12, lg: 4 }}>
                <Heading size="md">Datos de contacto</Heading>
                <Text mb="3" fontSize="md" color="fg.muted">
                  Información para la comunicación directa con el centro.
                </Text>
              </GridItem>

              <GridItem colSpan={{ base: 12, lg: 8 }}>
                <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                  <GridItem colSpan={{ base: 12, md: 6 }}>
                    <FormFieldInput
                      required
                      label="Teléfono"
                      placeholder="Ej: +54 11 4455-6789"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, phone: e.target.value }))
                      }
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 12, md: 6 }}>
                    <FormFieldInput
                      required
                      label="Correo electrónico"
                      placeholder="Ej: contacto@salud.ituzaingo.gob.ar"
                      value={form.email}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, email: e.target.value }))
                      }
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 12, md: 6 }}>
                    <FormFieldSelect
                      required
                      label="Día de inicio de atención"
                      options={diasOptions}
                      placeholder="Seleccioná un día"
                      size="sm"
                      width="100%"
                      value={form.dayStart}
                      onChange={(v) =>
                        setForm((s) => ({
                          ...s,
                          dayStart: Array.isArray(v) ? v[0] : v,
                        }))
                      }
                    />
                  </GridItem>
                  <GridItem colSpan={{ base: 12, md: 6 }}>
                    <FormFieldSelect
                      required
                      label="Día de fin de atención"
                      options={diasOptions}
                      placeholder="Seleccioná un día"
                      size="sm"
                      width="100%"
                      value={form.dayEnd}
                      onChange={(v) =>
                        setForm((s) => ({
                          ...s,
                          dayEnd: Array.isArray(v) ? v[0] : v,
                        }))
                      }
                    />
                  </GridItem>
                  <GridItem colSpan={{ base: 12, md: 6 }}>
                    <FormFieldSelect
                      required
                      label="Horario desde (24 h)"
                      options={horas24Options}
                      placeholder="Seleccioná hora (24 h)"
                      size="sm"
                      width="100%"
                      value={form.hourStart}
                      onChange={(v) =>
                        setForm((s) => ({
                          ...s,
                          hourStart: Array.isArray(v) ? v[0] : v,
                        }))
                      }
                    />
                  </GridItem>
                  <GridItem colSpan={{ base: 12, md: 6 }}>
                    <FormFieldSelect
                      required
                      label="Horario hasta (24 h)"
                      options={horas24Options}
                      placeholder="Seleccioná hora (24 h)"
                      size="sm"
                      width="100%"
                      value={form.hourEnd}
                      onChange={(v) =>
                        setForm((s) => ({
                          ...s,
                          hourEnd: Array.isArray(v) ? v[0] : v,
                        }))
                      }
                    />
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          </>
        )}

        {step === 2 && (
          <>
            {/* DATOS DEL RESPONSABLE MÉDICO */}
            <Grid templateColumns="repeat(12, 1fr)" gap={6} mt={10}>
              <GridItem colSpan={{ base: 12, lg: 4 }}>
                <Heading size="md">Datos del responsable médico</Heading>
                <Text mb="3" fontSize="md" color="fg.muted">
                  Completá los datos del profesional responsable del centro,
                  según los requisitos del Ministerio de Salud.
                </Text>
              </GridItem>

              <GridItem colSpan={{ base: 12, lg: 8 }}>
                <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                  <GridItem colSpan={{ base: 12, md: 4 }}>
                    <FormFieldInput
                      required
                      label="Nombre completo"
                      placeholder="Ej: Dra. María Rodríguez"
                      value={form.respName}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, respName: e.target.value }))
                      }
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 12, md: 4 }}>
                    <FormFieldInput
                      required
                      label="Teléfono institucional"
                      placeholder="Ej: +54 11 4455-7890"
                      value={form.respPhone}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, respPhone: e.target.value }))
                      }
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 12, md: 4 }}>
                    <FormFieldInput
                      required
                      label="Matrícula profesional"
                      placeholder="Ej: MN 123456"
                      value={form.respMatricula}
                      onChange={(e) =>
                        setForm((s) => ({
                          ...s,
                          respMatricula: e.target.value,
                        }))
                      }
                    />
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>

            {/* DOCUMENTACIÓN REQUERIDA */}
            <Grid templateColumns="repeat(12, 1fr)" gap={6} mt={10}>
              <GridItem colSpan={{ base: 12, lg: 4 }}>
                <Heading size="md">Documentación requerida</Heading>
                <Text mb="3" fontSize="md" color="fg.muted">
                  Adjuntá los archivos necesarios para su habilitación.
                </Text>
              </GridItem>

              <GridItem colSpan={{ base: 12, lg: 8 }}>
                <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                  <GridItem colSpan={{ base: 12, md: 6 }}>
                    <FormFieldInput
                      label="Habilitación municipal"
                      type="file"
                      inputProps={{ padding: 2 }}
                      onChange={(e) => {
                        const input = e.target as HTMLInputElement;
                        const file = input.files?.[0] ?? null;
                        setForm((s) => ({ ...s, municipalPermit: file }));
                      }}
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 12, md: 6 }}>
                    <FormFieldInput
                      label="Plano aprobado"
                      type="file"
                      inputProps={{ padding: 2 }}
                      onChange={(e) => {
                        const input = e.target as HTMLInputElement;
                        const file = input.files?.[0] ?? null;
                        setForm((s) => ({ ...s, approvedPlan: file }));
                      }}
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 12, md: 6 }}>
                    <FormFieldInput
                      label="Protocolo de atención"
                      type="file"
                      inputProps={{ padding: 2 }}
                      onChange={(e) => {
                        const input = e.target as HTMLInputElement;
                        const file = input.files?.[0] ?? null;
                        setForm((s) => ({ ...s, otherDocs: file }));
                      }}
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 12, md: 6 }}>
                    <FormFieldInput
                      label="Otros documentos"
                      type="file"
                      inputProps={{ padding: 2 }}
                      onChange={(e) => {
                        const input = e.target as HTMLInputElement;
                        const file = input.files?.[0] ?? null;
                        setForm((s) => ({ ...s, protocolFile: file }));
                      }}
                    />
                  </GridItem>
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
