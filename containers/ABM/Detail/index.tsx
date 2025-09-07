import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Stack, SimpleGrid, Heading, Button } from "@chakra-ui/react";
import { TopbarCoponent } from "../../../components";
import { Card } from "@chakra-ui/react";
import useFetch from "../../../hooks/useFetch";
import { ABM_LOCAL } from "../../../config/constanst";
import { LoadingOrError, NotFoundCenter } from "../../../containers";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const centerId = Number(id);
  const navigate = useNavigate();
  const [centerData, setCenterData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: centersDataResponse, error: errorMessage } = useFetch<any>(
    `${AUTH.GET_HEALTH_CENTERS}/${id}`,
    {
      useInitialFetch: true,
    }
  );

  useEffect(() => {
    setIsLoading(true);
    if (!centersDataResponse || Number.isNaN(centerId)) return;
    setIsLoading(false);
    console.log(centersDataResponse);
    setCenterData(centersDataResponse ?? null);
  }, [centersDataResponse]);

  const loadOrError = (
    <LoadingOrError
      isLoading={isLoading}
      error={errorMessage}
      onRetry={() => {}}
    />
  );
  if (isLoading || errorMessage) return loadOrError;

  if (!centerData) {
    return (
      <NotFoundCenter
        id={id}
        onBack={() => navigate(-1)}
        onRetry={() => {}}
        onGoList={() => navigate("/abm-salud")}
      />
    );
  }

  const cards = [
    {
      label: "Ver personal",
      desc: "Consultá el listado completo de profesionales asignados al centro, incluyendo roles y horarios.",
      onClick: () => navigate(`/abm-salud/detail/${centerData.id}/personal`),
    },
    {
      label: "Especialidades",
      desc: "Visualizá y gestioná las especialidades médicas habilitadas en este centro.",
      onClick: () =>
        navigate(`/abm-salud/detail/${centerData.id}/especialidades`),
    },
    {
      label: "Horarios de atención",
      desc: "Revisá y modificá los días y horarios de atención del centro, tanto generales como por especialidad.",
      onClick: () => navigate(`/abm-salud/detail/${centerData.id}/horarios`),
    },
    {
      label: "Documentación del centro",
      desc: "Accedé a archivos y datos asociados al centro: habilitaciones, protocolos, y otra información relevante.",
      onClick: () =>
        navigate(`/abm-salud/detail/${centerData.id}/documentacion`),
    },
  ];

  return (
    <Stack px={6}>
      <TopbarCoponent
        title={{ name: centerData.name }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Centros", onClick: () => navigate("/abm-salud") },
          { text: centerData.name, onClick: () => {} },
        ]}
        buttonList={[
          {
            text: "Editar centro",
            onClick: () => navigate(`/abm-salud/${centerData.id}/editar`),
            variant: "solid",
            colorScheme: "teal",
          },
        ]}
        menuOptions={[
          { label: "Ver historial de cambios", onClick: () => {} },
          { label: "Desactivar centro", onClick: () => {} },
          { label: "Duplicar centro", onClick: () => {} },
          { label: "Eliminar centro", onClick: () => {} },
        ]}
      />

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} mt={6}>
        {cards.map((c, i) => (
          <Card.Root
            key={i}
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.200"
            _hover={{ boxShadow: "md", cursor: "pointer" }}
            onClick={c.onClick}
            py={7}
            px={10}
          >
            <Card.Header px={4} py={3}>
              <Heading size="md">{c.label}</Heading>
            </Card.Header>
            <Card.Body px={4} py={2} color="gray.600">
              {c.desc}
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
