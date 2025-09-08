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
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  TopbarCoponent,
  ModuleBox,
  FormFieldInput,
  FormFieldSelect,
} from "../../../components";

type Patient = {
  id: string | number;
  fullName: string;
  document: string;
  email?: string;
  phone?: string;
};
//mock local
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
    }, 700);
  });
}

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

type Professional = {
  id: number;
  fullName: string;
  specialty: Specialty;
};

// MOCK: profesionales
const PROFESSIONALS: Professional[] = [
  { id: 1, fullName: "Dra. Ana Gómez", specialty: "CLINICA_MEDICA" },
  { id: 2, fullName: "Dr. Luis Martínez", specialty: "CLINICA_MEDICA" },
  { id: 3, fullName: "Dr. Pablo Rivas", specialty: "CARDIOLOGIA" },
  { id: 4, fullName: "Dra. Carla Núñez", specialty: "PEDIATRIA" },
  { id: 5, fullName: "Dra. Sofía Torres", specialty: "DERMATOLOGIA" },
  { id: 6, fullName: "Dr. Diego Paredes", specialty: "TRAUMATOLOGIA" },
  { id: 7, fullName: "Lic. Julieta Ávila", specialty: "NUTRICION" },
  { id: 8, fullName: "Lic. Martín Ruiz", specialty: "KINESIOLOGIA" },
  { id: 9, fullName: "Dra. Laura Pérez", specialty: "GINECOLOGIA" },
];

const CrearTurnoPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
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
    } catch (e: any) {
      setErrorMsg(e?.message || "Error al verificar paciente");
    } finally {
      setSearching(false);
    }
  };

  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | "">(
    ""
  );
  const [selectedProfessional, setSelectedProfessional] = useState<string>("");

  const humanize = (s: string) =>
    s
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase());

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
                helperOverlay
              />

              <Text mt={1} fontSize="sm" color="fg.muted">
                Solo números, sin puntos ni guiones
              </Text>
            </GridItem>

            <GridItem colSpan={{ base: 12, md: 4 }} alignSelf="center">
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
                setSelectedProfessional(""); // reset profesional al cambiar especialidad
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

        {canContinueStep2 && (
          <Stack mt={4}>
            <Text fontSize="sm" color="fg.muted">
              Seleccionado: {humanize(selectedSpecialty as string)} —{" "}
              {
                PROFESSIONALS.find((p) => p.id === Number(selectedProfessional))
                  ?.fullName
              }
            </Text>
          </Stack>
        )}
      </GridItem>
    </Grid>
  );

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
              : "Elegí especialidad y profesional"}
          </Heading>
        }
        footer={
          <HStack>
            {step === 2 && (
              <>
                <Button variant="outline" onClick={() => setStep(1)}>
                  Volver
                </Button>
                <Button
                  colorPalette="teal"
                  disabled={!canContinueStep2}
                  onClick={() => {}}
                >
                  Continuar
                </Button>
              </>
            )}
            {step === 1 && patient && (
              <Button colorPalette="teal" onClick={() => setStep(2)}>
                Continuar
              </Button>
            )}
          </HStack>
        }
      >
        {step === 1 ? Step1 : Step2}
      </ModuleBox>
    </Stack>
  );
};

export default CrearTurnoPage;
