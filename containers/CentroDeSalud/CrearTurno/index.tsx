import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Heading,
  Stack,
  Grid,
  GridItem,
  Text,
  HStack,
  Avatar,
  Separator,
  Card,
  Box,
  IconButton,
  SimpleGrid,
  Tag,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import {
  TopbarCoponent,
  ModuleBox,
  FormFieldInput,
  FormFieldSelect,
} from "../../../components";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import SuccessFeedback from "../../../containers/Feedback/SuccessFeedback";

type Patient = {
  id: string | number;
  fullName: string;
  document: string;
  email?: string;
  phone?: string;
};

type Specialty =
  | "CLINICA_MEDICA"
  | "CARDIOLOGIA"
  | "PEDIATRIA"
  | "GINECOLOGIA"
  | "OBSTETRICIA"
  | "TRAUMATOLOGIA"
  | "DERMATOLOGIA"
  | "NEUROLOGIA"
  | "PSICOLOGIA"
  | "PSIQUIATRIA"
  | "ODONTOLOGIA"
  | "KINESIOLOGIA"
  | "NUTRICION"
  | "FONOAUDIOLOGIA"
  | "OFTALMOLOGIA"
  | "OTORRINOLARINGOLOGIA"
  | "UROLOGIA";

const SPECIALTIES: Specialty[] = [
  "CLINICA_MEDICA",
  "CARDIOLOGIA",
  "PEDIATRIA",
  "GINECOLOGIA",
  "OBSTETRICIA",
  "TRAUMATOLOGIA",
  "DERMATOLOGIA",
  "NEUROLOGIA",
  "PSICOLOGIA",
  "PSIQUIATRIA",
  "ODONTOLOGIA",
  "KINESIOLOGIA",
  "NUTRICION",
  "FONOAUDIOLOGIA",
  "OFTALMOLOGIA",
  "OTORRINOLARINGOLOGIA",
  "UROLOGIA",
];

type Professional = { id: number; fullName: string; specialty: Specialty };

const PROFESSIONALS: Professional[] = [
  { id: 1, fullName: "Dra. Ana Gómez", specialty: "CLINICA_MEDICA" },
  { id: 2, fullName: "Dr. Luis Martínez", specialty: "CLINICA_MEDICA" },
  { id: 3, fullName: "Dr. Pablo Rivas", specialty: "CARDIOLOGIA" },
  { id: 4, fullName: "Dra. Carla Núñez", specialty: "PEDIATRIA" },
  { id: 5, fullName: "Dra. Sofía Torres", specialty: "DERMATOLOGIA" },
];

type SlotStatus = "FREE" | "BOOKED" | "CANCELLED";

type Slot = {
  id: string;
  centerId: number;
  staffUserId: string;
  patientUserId: string | null;
  startAt: string; // ISO
  endAt: string; // ISO
  specialty: Specialty;
  status: SlotStatus;
  notes: string | null;
  cancelReason: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
};

//  mock verificar paciente
const MOCK_PATIENTS: Patient[] = [
  {
    id: 1,
    fullName: "Juan Pérez",
    document: "34876543",
    email: "juan.perez@demo.com",
    phone: "+54 11 1111-2222",
  },
];

function mockVerifyPatientByDni(dni: string): Promise<Patient> {
  const clean = dni.replace(/\D/g, "");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = MOCK_PATIENTS.find((p) => p.document === clean);
      if (found) resolve(found);
      else reject(new Error("Paciente no encontrado"));
    }, 600);
  });
}

//  mock disponibilidad por mes/especialidad/profesional
function mockFetchAvailability(
  specialty: Specialty,
  professionalId: string,
  month: Date
): Promise<Slot[]> {
  const yyyy = month.getFullYear();
  const mm = month.getMonth();

  const mkISO = (d: Date) =>
    new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString();

  const baseDays = [1, 3, 8, 15, 20, 27].map((day) => new Date(yyyy, mm, day));
  const slots: Slot[] = [];

  baseDays.forEach((day, idx) => {
    const s1 = new Date(yyyy, mm, day.getDate(), 12, 0, 0);
    const e1 = new Date(yyyy, mm, day.getDate(), 12, 30, 0);
    const s2 = new Date(yyyy, mm, day.getDate(), 13, 0, 0);
    const e2 = new Date(yyyy, mm, day.getDate(), 13, 30, 0);

    slots.push(
      {
        id: cryptoRandomId(),
        centerId: 1,
        staffUserId: `staff-${professionalId}`,
        patientUserId: null,
        startAt: mkISO(s1),
        endAt: mkISO(e1),
        specialty,
        status: "FREE",
        notes: null,
        cancelReason: null,
        cancelledAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: cryptoRandomId(),
        centerId: 1,
        staffUserId: `staff-${professionalId}`,
        patientUserId: null,
        startAt: mkISO(s2),
        endAt: mkISO(e2),
        specialty,
        status: idx % 2 === 0 ? "FREE" : "BOOKED", // ocupados
        notes: null,
        cancelReason: null,
        cancelledAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
  });

  return new Promise((resolve) => setTimeout(() => resolve(slots), 700));
}

function cryptoRandomId() {
  return Math.random().toString(36).slice(2) + "-" + Date.now().toString(36);
}

//calendario
const humanize = (s: string) =>
  s
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());

function esMonthYear(d: Date) {
  return d.toLocaleDateString("es-AR", { month: "long", year: "numeric" });
}

function esTime(d: Date) {
  return d.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
}
function ymd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function monthGridDates(monthDate: Date) {
  // inicia en lunes de la semana del 1ro del mes
  const first = startOfMonth(monthDate);
  const w = (first.getDay() + 6) % 7; // 0 = lunes
  const start = new Date(first);
  start.setDate(first.getDate() - w);

  const arr: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    arr.push(d);
  }
  return arr;
}

//cvista principal

const CrearTurnoPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmedSlot, setConfirmedSlot] = useState<Slot | null>(null);

  // Step 1
  const [dni, setDni] = useState("");
  const [patient, setPatient] = useState<Patient | null>(null);
  const [searching, setSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dniNumeric = dni.replace(/\D/g, "");
  const canSearch = useMemo(() => dniNumeric.length >= 7, [dniNumeric]);

  const handleSearch = async () => {
    if (!canSearch || searching) return;
    setSearching(true);
    setErrorMsg(null);
    setPatient(null);
    try {
      const p = await mockVerifyPatientByDni(dni);
      setPatient(p);
      //setStep(2);
    } catch (e: any) {
      setErrorMsg(e?.message || "Error al verificar paciente");
    } finally {
      setSearching(false);
    }
  };

  // Step 2
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | "">(
    ""
  );
  const [selectedProfessional, setSelectedProfessional] = useState<string>("");

  const specialtyOptions = useMemo(
    () => SPECIALTIES.map((s) => ({ label: humanize(s), value: s })),
    []
  );
  const professionalOptions = useMemo(
    () =>
      selectedSpecialty
        ? PROFESSIONALS.filter((p) => p.specialty === selectedSpecialty).map(
            (p) => ({ label: p.fullName, value: String(p.id) })
          )
        : [],
    [selectedSpecialty]
  );
  const canContinueStep2 = Boolean(selectedSpecialty && selectedProfessional);

  // Step 3
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");

  // cargar disponibilidad cuando cambia mes/especialidad/profesional
  useEffect(() => {
    if (!selectedSpecialty || !selectedProfessional || step !== 3) return;
    setLoadingSlots(true);
    setSlotsError(null);
    setSlots([]);
    mockFetchAvailability(
      selectedSpecialty as Specialty,
      selectedProfessional,
      currentMonth
    )
      .then((res) => setSlots(res))
      .catch(() => setSlotsError("No pudimos cargar la disponibilidad."))
      .finally(() => setLoadingSlots(false));
  }, [selectedSpecialty, selectedProfessional, currentMonth, step]);

  // indexar por día
  const slotsByDay = useMemo(() => {
    const map: Record<string, Slot[]> = {};
    slots.forEach((s) => {
      if (s.status !== "FREE") return;
      const d = ymd(new Date(s.startAt));
      map[d] = map[d] || [];
      map[d].push(s);
    });
    // ordenar por hora
    Object.values(map).forEach((arr) =>
      arr.sort(
        (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
      )
    );
    return map;
  }, [slots]);

  const days = monthGridDates(currentMonth);
  const monthIdx = currentMonth.getMonth();

  const selectedSlot = useMemo(
    () => slots.find((s) => s.id === selectedSlotId),
    [selectedSlotId, slots]
  );

  //paso 1
  const Step1 = (
    <>
      <Grid templateColumns="repeat(12, 1fr)" gap={6} alignItems="end">
        <GridItem colSpan={{ base: 12, lg: 4 }}>
          <Heading size="md">Verificar paciente</Heading>
          <Text mb="3" fontSize="md" color="fg.muted">
            Ingresá el DNI para buscar al paciente en el sistema.
          </Text>
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 8 }}>
          <Grid templateColumns="repeat(12, 1fr)" gap={6} alignItems="end">
            <GridItem colSpan={{ base: 12, md: 8 }}>
              <FormFieldInput
                required
                label="DNI"
                placeholder="Ej: 34876543"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                helperOverlay={true}
              />
              <Text mt={1} fontSize="sm" color="fg.muted">
                Solo números, sin puntos ni guiones
              </Text>
            </GridItem>

            <GridItem colSpan={{ base: 12, md: 4 }} alignSelf={"center"}>
              <Button
                width="full"
                colorPalette="teal"
                onClick={handleSearch}
                disabled={!canSearch || searching}
                loading={searching}
              >
                Buscar
              </Button>
            </GridItem>
          </Grid>

          {errorMsg && (
            <Text mt={3} color="red.500" fontSize="sm">
              {errorMsg}
            </Text>
          )}

          {patient && (
            <Card.Root mt={6} p={4} borderColor="gray.200" borderWidth="1px">
              <HStack gap={4} align="center">
                <Avatar.Root>
                  <Avatar.Fallback name={patient.fullName} />
                </Avatar.Root>
                <Box>
                  <Text fontWeight="semibold">{patient.fullName}</Text>
                  <Text fontSize="sm" color="fg.muted">
                    DNI: {patient.document}
                    {patient.email ? ` • ${patient.email}` : ""}
                    {patient.phone ? ` • ${patient.phone}` : ""}
                  </Text>
                </Box>
              </HStack>
            </Card.Root>
          )}
        </GridItem>
      </Grid>

      <Separator my={5} />
    </>
  );

  //paso 2
  const Step2 = (
    <Grid templateColumns="repeat(12, 1fr)" gap={6}>
      <GridItem colSpan={{ base: 12, lg: 4 }}>
        <Heading size="md">Seleccionar especialidad y profesional</Heading>
        <Text mb="3" fontSize="md" color="fg.muted">
          Elegí una especialidad y luego el profesional disponible.
        </Text>
      </GridItem>

      <GridItem colSpan={{ base: 12, lg: 8 }}>
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          <GridItem colSpan={{ base: 12, md: 6 }}>
            <FormFieldSelect
              required
              label="Especialidad"
              value={selectedSpecialty}
              placeholder="Elegí una especialidad"
              options={specialtyOptions}
              onChange={(v) => {
                setSelectedSpecialty((v as Specialty) || "");
                setSelectedProfessional("");
              }}
            />
          </GridItem>

          <GridItem colSpan={{ base: 12, md: 6 }}>
            <FormFieldSelect
              required
              label="Profesional"
              value={selectedProfessional}
              placeholder={
                selectedSpecialty
                  ? "Elegí un profesional"
                  : "Seleccioná especialidad primero"
              }
              options={professionalOptions}
              disabled={!selectedSpecialty}
              onChange={(v) => setSelectedProfessional((v as string) || "")}
            />
          </GridItem>
        </Grid>

        {selectedSpecialty && selectedProfessional && (
          <Stack mt={4}>
            <Text fontSize="sm" color="fg.muted">
              Seleccionado: {humanize(selectedSpecialty as string)} —{" "}
              {
                PROFESSIONALS.find((p) => String(p.id) === selectedProfessional)
                  ?.fullName
              }
            </Text>
          </Stack>
        )}
      </GridItem>
    </Grid>
  );

  //paso 3
  const weekdays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  const Step3 = (
    <Stack>
      <HStack justify="space-between">
        <Heading size="md">Disponibilidad</Heading>
        <HStack>
          <IconButton
            aria-label="Mes anterior"
            onClick={() => setCurrentMonth((m) => addMonths(m, -1))}
          >
            <LuChevronLeft />
          </IconButton>
          <Text fontWeight="semibold" textTransform="capitalize">
            {esMonthYear(currentMonth)}
          </Text>
          <IconButton
            aria-label="Mes siguiente"
            onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
          >
            <LuChevronRight />
          </IconButton>
        </HStack>
      </HStack>

      <SimpleGrid columns={7} gap={2} mt={2}>
        {weekdays.map((w) => (
          <Box key={w} textAlign="center" fontSize="sm" color="fg.muted">
            {w}
          </Box>
        ))}
      </SimpleGrid>

      <SimpleGrid columns={7} gap={2}>
        {days.map((d, idx) => {
          const inMonth = d.getMonth() === monthIdx;
          const key = ymd(d);
          const daySlots = slotsByDay[key] || [];

          return (
            <Box
              key={idx}
              p={2}
              borderWidth="1px"
              borderColor={inMonth ? "gray.200" : "gray.100"}
              bg={inMonth ? "white" : "gray.50"}
              minH="110px"
              borderRadius="md"
            >
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" color={inMonth ? "gray.800" : "gray.400"}>
                  {d.getDate()}
                </Text>
                {inMonth && daySlots.length > 0 && (
                  <Tag.Root size="sm" colorPalette="teal" variant="subtle">
                    <Tag.Label>{daySlots.length}</Tag.Label>
                  </Tag.Root>
                )}
              </HStack>

              <Stack gap={1}>
                {loadingSlots && idx < 7 ? (
                  <Box h="8" bg="gray.100" borderRadius="sm" />
                ) : (
                  daySlots.slice(0, 3).map((s) => {
                    const start = new Date(s.startAt);
                    const label = esTime(start);
                    const selected = selectedSlotId === s.id;
                    return (
                      <Button
                        key={s.id}
                        size="xs"
                        variant={selected ? "solid" : "outline"}
                        colorPalette="teal"
                        onClick={() => setSelectedSlotId(s.id)}
                      >
                        {label}
                      </Button>
                    );
                  })
                )}
                {/* si hay más de 3, indicamos +N */}
                {daySlots.length > 3 && (
                  <Text fontSize="xs" color="fg.muted">
                    +{daySlots.length - 3} más
                  </Text>
                )}
              </Stack>
            </Box>
          );
        })}
      </SimpleGrid>

      {slotsError && (
        <Text mt={3} color="red.500" fontSize="sm">
          {slotsError}
        </Text>
      )}

      {selectedSlot && (
        <Card.Root mt={4} p={4} borderWidth="1px" borderColor="gray.200">
          <Text fontWeight="semibold" mb={1}>
            Turno seleccionado
          </Text>
          <Text fontSize="sm" color="fg.muted">
            {humanize(selectedSlot.specialty)} —{" "}
            {
              PROFESSIONALS.find((p) => String(p.id) === selectedProfessional)
                ?.fullName
            }
            {" • "}
            {new Date(selectedSlot.startAt).toLocaleDateString("es-AR", {
              weekday: "short",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}{" "}
            {esTime(new Date(selectedSlot.startAt))}–
            {esTime(new Date(selectedSlot.endAt))}
          </Text>
        </Card.Root>
      )}
    </Stack>
  );

  // pantalla de success
  if (showSuccess && confirmedSlot && patient) {
    const profName =
      PROFESSIONALS.find((p) => String(p.id) === selectedProfessional)
        ?.fullName || "";
    const fecha = new Date(confirmedSlot.startAt).toLocaleDateString("es-AR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const hora = new Date(confirmedSlot.startAt).toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <SuccessFeedback
        title="¡Turno confirmado!"
        message={`Agendaste a ${patient.fullName} con ${profName} (${humanize(
          confirmedSlot.specialty
        )}) el ${fecha} a las ${hora}.`}
        status="APPLIED"
        idLabel="ID del turno"
        idValue={confirmedSlot.id}
        primaryText="Volver al inicio"
        onPrimary={() => navigate("/")}
        secondaryText="Crear otro turno"
        onSecondary={() => {
          // reset básico para cargar otro turno
          setShowSuccess(false);
          setConfirmedSlot(null);
          setStep(1);
          setDni("");
          setPatient(null);
          setSelectedSpecialty("");
          setSelectedProfessional("");
          setSelectedSlotId("");
        }}
      />
    );
  }

  //return vista
  return (
    <Stack gap={6} px={6}>
      <TopbarCoponent
        title={{ name: "Sacar turno desde el centro" }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "Turnos", onClick: () => navigate("/disponibilidad") },
          { text: "Crear turno", onClick: () => {} },
        ]}
      />

      <ModuleBox
        header={
          <Heading size="md">
            {step === 1
              ? "Verificar paciente"
              : step === 2
              ? "Elegí especialidad y profesional"
              : "Elegí un turno disponible"}
          </Heading>
        }
        footer={
          <HStack>
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep((s) => (s === 3 ? 2 : 1))}
              >
                Volver
              </Button>
            )}

            {step === 1 && patient && (
              <Button colorPalette="teal" onClick={() => setStep(2)}>
                Continuar
              </Button>
            )}

            {step === 2 && (
              <Button
                colorPalette="teal"
                disabled={!canContinueStep2}
                onClick={() => setStep(3)}
              >
                Continuar
              </Button>
            )}

            {step === 3 && (
              <Button
                colorPalette="teal"
                disabled={!selectedSlot}
                onClick={() => {
                  //envio el turno
                  setConfirmedSlot(selectedSlot);
                  setShowSuccess(true);
                }}
              >
                Confirmar turno
              </Button>
            )}
          </HStack>
        }
      >
        {step === 1 ? Step1 : step === 2 ? Step2 : Step3}
      </ModuleBox>
    </Stack>
  );
};

export default CrearTurnoPage;
