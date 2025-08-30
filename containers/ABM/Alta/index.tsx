import React, { useEffect } from "react";
import {
  TopbarCoponent,
  FormFieldInput,
  FormFieldSelect,
  ModuleBox,
  AddressAutocomplete,
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
import SuccessFeedback from "../../Feedback/SuccessFeedback";
import { diasOptions, horas24Options, zonasOptions } from "./statics";
import useFetch from "../../../hooks/useFetch";
import { ABM_LOCAL } from "../../../config/constanst";

type CreateRequestResponse = {
  id: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt?: string;
};

const AltaPage = () => {
  let navigate = useNavigate();
  const [feedback, setFeedback] = React.useState<CreateRequestResponse | null>(
    null
  );

  const [geocoding, setGeocoding] = React.useState(false);
  const [geoError, setGeoError] = React.useState<string | null>(null);

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

  const {
    data: createCenterResponse,
    makeRequest: createCenter,
    isLoading,
    error: errorMessage,
  } = useFetch<CreateRequestResponse | null>(ABM_LOCAL.CREATE_CENTER, {
    useInitialFetch: false,
    method: "post",
    data: {
      name: form.name,
      address: form.address,
      zone: form.zone,
      capacity: form.capacity ? Number(form.capacity) : null,
      latitude: Number(form.lat),
      longitude: Number(form.lng),
      description: form.description,
      phone: form.phone,
      email: form.email,
      startDay: "MON",
      endDay: "MON",
      openTime: form.hourStart,
      closeTime: form.hourEnd,
      respFullName: form.respName,
      respPhone: form.respPhone,
      respLicense: form.respMatricula,
    },
  });

  useEffect(() => {
    if (!createCenterResponse) return;
    if (typeof createCenterResponse !== "object") return;
    if (!("id" in createCenterResponse)) return;
    // if (createCenterResponse.id) {

    setFeedback(createCenterResponse);
    // }
  }, [createCenterResponse]);

  const CITY_CONTEXT = "Ituzaingó, Buenos Aires, Argentina";

  const geocodeAddress = async (addr: string) => {
    if (!addr || addr.trim().length < 5) {
      setForm((s) => ({ ...s, lat: "", lng: "" }));
      return;
    }
    setGeocoding(true);
    setGeoError(null);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(
        `${addr}, ${CITY_CONTEXT}`
      )}&email=contacto@ituzaingo.gob.ar`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const first = data?.[0];

      if (first?.lat && first?.lon) {
        setForm((s) => ({
          ...s,
          lat: String(first.lat),
          lng: String(first.lon),
        }));
      } else {
        setForm((s) => ({ ...s, lat: "", lng: "" }));
        setGeoError("No se encontraron coordenadas para esa dirección.");
      }
    } catch (e) {
      setGeoError("Error geocodificando la dirección.");
    } finally {
      setGeocoding(false);
    }
  };

  const canContinue =
    form.name.trim() &&
    form.zone &&
    form.capacity &&
    form.address.trim() &&
    form.lat &&
    form.lng;

  const canSubmit =
    form.respName.trim() && form.respPhone.trim() && form.respMatricula.trim();

  if (feedback) {
    return (
      <SuccessFeedback
        message="Tu solicitud quedó pendiente de aprobación. Te avisaremos cuando sea revisada."
        status={feedback.status}
        idValue={feedback.id}
        primaryText="Volver al inicio"
        onPrimary={() => navigate("/abm-salud")}
        secondaryText="Ver solicitudes"
        onSecondary={() => navigate("/abm-salud/solicitudes-pendientes")}
      />
    );
  }

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
              <Button
                colorPalette="teal"
                onClick={() => setStep(2)}
                disabled={!canContinue}
              >
                Continuar
              </Button>
            ) : (
              <Button
                colorPalette="teal"
                onClick={() => {
                  createCenter();
                }}
                disabled={!canContinue && !canSubmit}
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

                  <GridItem colSpan={{ base: 12 }}>
                    <AddressAutocomplete
                      required
                      value={form.address}
                      onChange={(v) => setForm((s) => ({ ...s, address: v }))}
                      onSelect={(sug) =>
                        setForm((prev) => ({
                          ...prev,
                          address: sug.label,
                          lat: sug.lat,
                          lng: sug.lon,
                        }))
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
