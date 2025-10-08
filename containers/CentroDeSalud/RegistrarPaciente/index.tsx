// src/containers/Pacientes/RegistroPacientePage.tsx
import { TopbarCoponent } from "../../../components";
import {
  Button,
  Heading,
  Stack,
  Grid,
  GridItem,
  Text,
  Separator,
} from "@chakra-ui/react";
import { ModuleBox, FormFieldInput } from "../../../components";
import { useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { AUTH } from "../../../config/constanst";
import SuccessFeedback from "../../Feedback/SuccessFeedback";

type CreatePatientResponse = {
  id?: number | string;
  status?: "PENDING" | "APPROVED" | "REJECTED" | "APPLIED";
  user?: { name?: string; fullName?: string; email?: string };
};

const RegistroPacientePage = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<CreatePatientResponse | null>(null);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    document: "",
    phone: "",
  });

  const {
    data: createRes,
    makeRequest: createPatient,
    isLoading,
    error: errorMessage,
  } = useFetch<CreatePatientResponse | null>(AUTH.CREATE_PERSONAL, {
    useInitialFetch: false,
    method: "post",
    data: {
      email: form.email.trim(),
      password: form.document.replace(/\D/g, ""),
      profileType: "PATIENT",
      fullName: `${form.name} ${form.lastName}`.trim(),
      document: form.document.replace(/\D/g, ""),
      phone: form.phone.trim(),
      orgId: "org-1",
    },
  });

  useEffect(() => {
    if (!createRes) return;
    setFeedback({
      status: createRes.status ?? "APPLIED",
      id: createRes.id,
      user: createRes.user,
    });
  }, [createRes]);

  const canSubmit = useMemo(() => {
    const hasEmail = /\S+@\S+\.\S+/.test(form.email);
    const docLen = form.document.replace(/\D/g, "").length;
    return (
      form.name.trim() &&
      form.lastName.trim() &&
      hasEmail &&
      docLen >= 7 &&
      form.phone.trim()
    );
  }, [form]);

  if (feedback) {
    const nombre =
      feedback.user?.name ||
      feedback.user?.fullName ||
      `${form.name} ${form.lastName}`.trim();

    return (
      <SuccessFeedback
        title="¡Paciente registrado!"
        message={`Registraste al paciente: ${nombre}`}
        status="APPLIED"
        idLabel="ID (si aplica)"
        idValue={feedback.id}
        primaryText="Volver al inicio"
        onPrimary={() => navigate("/sanatorio")}
        secondaryText="Registrar otro paciente"
        onSecondary={() => {
          setFeedback(null);
          setForm({
            name: "",
            lastName: "",
            email: "",
            password: "",
            document: "",
            phone: "",
          });
        }}
      />
    );
  }

  return (
    <Stack gap={6} px={6}>
      <TopbarCoponent
        title={{ name: "Registrar paciente" }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "Sanatorio", onClick: () => navigate("/sanatorio") },
          {
            text: "Registrar paciente",
            onClick: () => {
              "/sanatorio/agregar-paciente";
            },
          },
        ]}
      />

      <ModuleBox
        header={
          <Heading size="md">Completá la información del paciente</Heading>
        }
        footer={
          <Stack flexDirection={"row"}>
            <Button
              colorPalette="teal"
              onClick={() => createPatient()}
              disabled={!canSubmit || isLoading}
            >
              Crear paciente
            </Button>
          </Stack>
        }
      >
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          <GridItem colSpan={{ base: 12, lg: 4 }}>
            <Heading size="md">Información personal</Heading>
            <Text mb="3" fontSize="md" color="fg.muted">
              Datos básicos del paciente.
            </Text>
          </GridItem>

          <GridItem colSpan={{ base: 12, lg: 8 }}>
            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
              <GridItem colSpan={{ base: 12, md: 6 }}>
                <FormFieldInput
                  required
                  label="Nombre"
                  placeholder="Ej: Juan"
                  value={form.name}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, name: e.target.value }))
                  }
                />
              </GridItem>

              <GridItem colSpan={{ base: 12, md: 6 }}>
                <FormFieldInput
                  required
                  label="Apellido"
                  placeholder="Ej: Pérez"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, lastName: e.target.value }))
                  }
                />
              </GridItem>

              <GridItem colSpan={{ base: 12, md: 6 }}>
                <FormFieldInput
                  required
                  label="Email"
                  placeholder="user@demo.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, email: e.target.value }))
                  }
                />
              </GridItem>

              {/* <GridItem colSpan={{ base: 12, md: 6 }}>
                <FormFieldInput
                  required
                  label="Contraseña"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={form.password}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, password: e.target.value }))
                  }
                />
              </GridItem> */}

              <GridItem colSpan={{ base: 12, md: 6 }}>
                <FormFieldInput
                  required
                  label="Documento"
                  placeholder="Ej: 34876543"
                  value={form.document}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, document: e.target.value }))
                  }
                  // helperText="Solo números, sin puntos ni guiones"
                />
              </GridItem>

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
            </Grid>

            {errorMessage && (
              <Text mt={3} color="red.500" fontSize="sm">
                {String(errorMessage)}
              </Text>
            )}
          </GridItem>
        </Grid>

        <Separator my={5} />
      </ModuleBox>
    </Stack>
  );
};

export default RegistroPacientePage;
