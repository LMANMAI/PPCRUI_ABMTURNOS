import React, { useEffect, useMemo, useState } from "react";
import {
  Stack,
  Grid,
  GridItem,
  Button,
  Text,
  Heading,
  Badge,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import {
  TopbarCoponent,
  FormFieldInput,
  FormFieldSelect,
} from "../../../../components";
import { ModuleBox } from "../../../../components/ModuleBox";
import useFetch from "../../../../hooks/useFetch";
import { ABM_LOCAL } from "../../../../config/constanst";

type Centro = {
  id: number;
  name: string;
  status: "ACTIVO" | "INACTIVO";
};

const CrearCampaniaScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataToTable, setDataToTable] = useState<Centro[]>([]);
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    centers: [] as string[],
  });
  const navigate = useNavigate();

  //consulto al ep los centro de salud

  const {
    data: centersData,
    isLoading,
    error: errorMessage,
  } = useFetch<any>(ABM_LOCAL.GET_HEALTH_CENTERS, {
    useInitialFetch: true,
  });

  useEffect(() => {
    setLoading(true);
    if (centersData && centersData.data) {
      setLoading(false);
      setDataToTable(centersData.data);
    }
  }, [centersData]);

  const activeCenters = dataToTable.filter((c) => c.status === "ACTIVO");

  const centersOptions = useMemo(
    () =>
      activeCenters.map((c) => ({
        label: c.name,
        value: String(c.id),
      })),
    [activeCenters]
  );

  const handleSubmit = () => {
    console.log({
      name: form.name,
      startDate: form.startDate,
      endDate: form.endDate,
      centers: form.centers.map(Number),
    });
    navigate("/abm-salud/campañas");
  };

  return (
    <Stack px={6} py={8} gap={6}>
      <TopbarCoponent
        title={{ name: "Crear campaña de vacunación" }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Centros", onClick: () => navigate("/abm-salud") },
          {
            text: "Administrar campañas",
            onClick: () => {
              navigate("/abm-salud/campañas");
            },
          },
          {
            text: "Crear campaña de vacunación",
            onClick: () => {
              navigate("/abm-salud/campañas//crear-campaña");
            },
          },
        ]}
        buttonList={[
          {
            text: "Guardar borrador",
            onClick: () => {},
            variant: "outline",
            colorScheme: "teal",
          },
        ]}
      />

      <ModuleBox
        header={
          <Heading size="md">
            Completá los datos de la campaña y seleccioná los centros
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
        {/* Datos de la campaña */}
        <Grid templateColumns="repeat(12, 1fr)" gap={6} mb={6}>
          <GridItem colSpan={{ base: 12, lg: 4 }}>
            <Heading size="md">Datos de la campaña</Heading>
            <Text mt={2} fontSize="sm" color="fg.muted">
              Nombre y período de la campaña.
            </Text>
          </GridItem>

          <GridItem colSpan={{ base: 12, lg: 8 }}>
            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
              <GridItem colSpan={{ base: 12, md: 6 }}>
                <FormFieldInput
                  required
                  label="Nombre de la campaña"
                  placeholder="Vacunación Antigripal 2025"
                  value={form.name}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, name: e.target.value }))
                  }
                />
              </GridItem>

              <GridItem colSpan={{ base: 12, md: 3 }}>
                <FormFieldInput
                  required
                  label="Fecha de inicio"
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, startDate: e.target.value }))
                  }
                />
              </GridItem>

              <GridItem colSpan={{ base: 12, md: 3 }}>
                <FormFieldInput
                  required
                  label="Fecha de fin"
                  type="date"
                  value={form.endDate}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, endDate: e.target.value }))
                  }
                />
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>

        {/* Centros involucrados */}
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          <GridItem colSpan={{ base: 12, lg: 4 }}>
            <Heading size="md">Centros involucrados</Heading>
            <Text mt={2} fontSize="sm" color="fg.muted">
              Seleccioná uno o varios centros activos.
            </Text>
          </GridItem>

          <GridItem colSpan={{ base: 12, lg: 8 }}>
            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
              <GridItem colSpan={{ base: 12 }}>
                <FormFieldSelect
                  required
                  label="Centros"
                  multiple
                  options={centersOptions}
                  placeholder="Seleccioná centros..."
                  value={form.centers} // string[]
                  onChange={(v) =>
                    setForm((s) => ({
                      ...s,
                      centers: Array.isArray(v) ? v : [],
                    }))
                  }
                  size="md"
                  variant="outline"
                />
              </GridItem>

              {form.centers.length > 0 && (
                <GridItem colSpan={{ base: 12 }}>
                  <Stack direction="row" gap={2} wrap="wrap">
                    {form.centers.map((val) => {
                      const centro = activeCenters.find(
                        (c) => String(c.id) === val
                      );
                      return (
                        <Badge key={val} colorPalette="teal">
                          {centro?.name ?? val}
                        </Badge>
                      );
                    })}
                  </Stack>
                </GridItem>
              )}
            </Grid>
          </GridItem>
        </Grid>
      </ModuleBox>
    </Stack>
  );
};

export default CrearCampaniaScreen;
