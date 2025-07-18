// src/pages/DetailPage.tsx
import React from "react";
import { useParams, useNavigate } from "react-router";
import { Stack, SimpleGrid, Heading, Button } from "@chakra-ui/react";
import { TopbarCoponent } from "../../../components";
import { Card } from "@chakra-ui/react";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const rawData = [
    {
      id: 1,
      name: "Centro de Salud N°1",
      address: "Av. Rivadavia 1200",
      zone: "Centro",
      specialties: "General, Pediatría",
      status: "ACTIVO",
    },
    {
      id: 2,
      name: "Hospital Sur",
      address: "Av. Mitre 2335",
      zone: "Sur",
      specialties: "General, Cardiología",
      status: "INACTIVO",
    },
    {
      id: 3,
      name: "Clínica Norte",
      address: "Calle Belgrano 4035",
      zone: "Norte",
      specialties: "General, Odontología",
      status: "ACTIVO",
    },
    {
      id: 4,
      name: "Hospital Municipal",
      address: "Ruta 12 km 3",
      zone: "Este",
      specialties: "General",
      status: "ACTIVO",
    },
  ];

  const centroId = Number(id);
  const centro = rawData.find((c) => c.id === centroId);

  if (!centro) {
    return (
      <Heading mt={10} textAlign="center">
        Centro no encontrado
      </Heading>
    );
  }

  const cards = [
    {
      label: "Ver personal",
      desc: "Consultá el listado completo de profesionales asignados al centro, incluyendo roles y horarios.",
      onClick: () => navigate(`/abm-salud/detail/${centroId}/personal`),
    },
    {
      label: "Especialidades",
      desc: "Visualizá y gestioná las especialidades médicas habilitadas en este centro.",
      onClick: () => navigate(`/abm-salud/detail/${centroId}/especialidades`),
    },
    {
      label: "Horarios de atención",
      desc: "Revisá y modificá los días y horarios de atención del centro, tanto generales como por especialidad.",
      onClick: () => navigate(`/abm-salud/detail/${centroId}/horarios`),
    },
    {
      label: "Documentación del centro",
      desc: "Accedé a archivos y datos asociados al centro: habilitaciones, protocolos, y otra información relevante.",
      onClick: () => navigate(`/abm-salud/detail/${centroId}/documentacion`),
    },
  ];

  return (
    <Stack px={6}>
      <TopbarCoponent
        title={{ name: centro.name }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Centros", onClick: () => navigate("/abm-salud") },
          { text: centro.name, onClick: () => {} },
        ]}
        buttonList={[
          {
            text: "Editar centro",
            onClick: () => navigate(`/abm-salud/${centroId}/editar`),
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
