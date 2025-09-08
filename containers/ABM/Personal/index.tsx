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
import {
  ModuleBox,
  FormFieldInput,
  FormFieldSelect,
} from "../../../components";
import { useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { ABM_LOCAL, AUTH } from "../../../config/constanst";
import SuccessFeedback from "../../Feedback/SuccessFeedback";

type CreateRequestResponse = {
  id: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt?: string;
};

const PersonalAltaPage = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<CreateRequestResponse | null>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    document: "",
    phone: "",
    profileType: "OPERADOR_SALUD",
    orgId: "org-1",
    staffFullName: "",
    centerId: "",
  });

  const { data: centersData } = useFetch<any>(ABM_LOCAL.GET_HEALTH_CENTERS, {
    useInitialFetch: true,
  });

  const centerOptions =
    centersData?.map((c: any) => ({
      label: `${c.name} – ${c.address ?? c.zone ?? ""}`,
      value: String(c.id),
    })) ?? [];

  const {
    data: createRes,
    makeRequest: createPersonal,
    isLoading,
    error: errorMessage,
  } = useFetch<any | null>(AUTH.CREATE_PERSONAL, {
    useInitialFetch: false,
    method: "post",
    data: {
      email: form.email.trim(),
      password: form.password,
      orgId: form.orgId,
      profileType: form.profileType,
      fullName: `${form.name} ${form.lastName}`.trim(),
      document: form.document.replace(/\D/g, ""),
      phone: form.phone.trim(),
      staffFullName: (
        form.staffFullName || `${form.name} ${form.lastName}`
      ).trim(),
      centerId: form.centerId,
    },
  });

  useEffect(() => {
    if (!createRes) return;
    setFeedback(createRes);
  }, [createRes]);

  const canContinue = useMemo(() => {
    const hasEmail = /\S+@\S+\.\S+/.test(form.email);
    return (
      form.name.trim() &&
      form.lastName.trim() &&
      hasEmail &&
      form.password.trim().length >= 6 &&
      form.document.replace(/\D/g, "").length >= 7
    );
  }, [form]);

  const canSubmit = useMemo(() => {
    return form.centerId && form.phone.trim();
  }, [form.centerId, form.phone]);

  if (feedback) {
    return (
      <SuccessFeedback
        message={`Diste de alta al empleado : ${createRes?.user.name}`}
        status={feedback.status}
        idValue={feedback?.id}
        primaryText="Volver al inicio"
        onPrimary={() => navigate("/administrar")}
        secondaryText="Ver solicitudes"
        onSecondary={() => navigate("/administrar/solicitudes-pendientes")}
      />
    );
  }

  return (
    <Stack gap={6} px={6}>
      <TopbarCoponent
        title={{ name: "Agregar personal" }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Centros", onClick: () => navigate("/administrar") },
          {
            text: "Agregar personal",
            onClick: () => navigate("/administrar/personal"),
          },
        ]}
      />

      <ModuleBox
        header={
          <Heading size="md">Completá la información del personal</Heading>
        }
        footer={
          <Stack flexDirection={"row"}>
            {step === 1 ? (
              <Button
                colorPalette="teal"
                onClick={() => setStep(2)}
                // disabled={!canContinue}
              >
                Continuar
              </Button>
            ) : (
              <Button
                colorPalette="teal"
                onClick={() => createPersonal()}
                disabled={!canSubmit || isLoading}
              >
                Crear personal
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
                <Heading size="md">Información personal</Heading>
                <Text mb="3" fontSize="md" color="fg.muted">
                  Datos básicos del usuario del sistema.
                </Text>
              </GridItem>

              <GridItem colSpan={{ base: 12, lg: 8 }}>
                <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                  <GridItem colSpan={{ base: 12, md: 6 }}>
                    <FormFieldInput
                      required
                      label="Nombre"
                      placeholder="Ej: María"
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
                      placeholder="Ej: Rodríguez"
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
                  <GridItem colSpan={{ base: 12, md: 6 }}>
                    <FormFieldInput
                      required
                      label="Contraseña"
                      type="password"
                      placeholder="Numero del centro + dni"
                      value={form.password}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, password: e.target.value }))
                      }
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 12, md: 6 }}>
                    <FormFieldInput
                      required
                      label="Documento"
                      placeholder="Ej: 34876543"
                      value={form.document}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, document: e.target.value }))
                      }
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

                  <GridItem colSpan={{ base: 12, md: 6 }}>
                    <FormFieldSelect
                      required
                      label="Perfil"
                      value={form.profileType}
                      options={[
                        {
                          label: "Doctor",
                          value: "PERSONAL_SALUD ",
                        },
                        {
                          label: "Administrador del centro",
                          value: "CENTER_ADMIN",
                        },
                        {
                          label: "Administrador de organizacion",
                          value: "ORG_ADMIN",
                        },
                        {
                          label: "Operador del centro",
                          value: "OPERADOR_SALUD",
                        },
                      ]}
                      placeholder="Seleccioná perfil"
                      onChange={(v) =>
                        setForm((s) => ({
                          ...s,
                          profileType: (v as string) || "STAFF",
                        }))
                      }
                    />
                  </GridItem>
                  {/* <GridItem colSpan={{ base: 12, md: 6 }}>
                    <FormFieldInput
                      label="Organización"
                      placeholder="org-1"
                      value={form.orgId}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, orgId: e.target.value }))
                      }
                    />
                  </GridItem> */}

                  <GridItem colSpan={{ base: 12, md: 6 }}>
                    <FormFieldInput
                      label="Nombre para staff (opcional)"
                      placeholder="Si se omite, usamos Nombre + Apellido"
                      value={form.staffFullName}
                      onChange={(e) =>
                        setForm((s) => ({
                          ...s,
                          staffFullName: e.target.value,
                        }))
                      }
                    />
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>

            <Separator my={5} />
          </>
        )}

        {step === 2 && (
          <Grid templateColumns="repeat(12, 1fr)" gap={6}>
            <GridItem colSpan={{ base: 12, lg: 4 }}>
              <Heading size="md">Asignación</Heading>
              <Text mb="3" fontSize="md" color="fg.muted">
                Seleccioná el centro en el que trabajará.
              </Text>
            </GridItem>

            <GridItem colSpan={{ base: 12, lg: 8 }}>
              <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                <GridItem colSpan={{ base: 12, md: 8 }}>
                  <FormFieldSelect
                    required
                    label="Centro asignado"
                    value={form.centerId}
                    placeholder="Elegí un centro"
                    options={centerOptions}
                    onChange={(v) =>
                      setForm((s) => ({ ...s, centerId: (v as string) || "" }))
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
        )}
      </ModuleBox>
    </Stack>
  );
};

export default PersonalAltaPage;
