import {
  Stack,
  Heading,
  Text,
  HStack,
  Box,
  Icon,
  Button,
} from "@chakra-ui/react";
import { FaFilePdf } from "react-icons/fa";
import { TopbarCoponent } from "../../../../components";
import { useNavigate, useParams } from "react-router";
import { rawData, Centro } from "../Especialidades/static";

interface Documento {
  id: number;
  title: string;
  description: string;
  url: string;
}

const mockDocumentos: Documento[] = [
  {
    id: 1,
    title: "Protocolo de Higiene",
    description: "Documento con las normas de higiene y limpieza del centro.",
    url: "/docs/protocolo_higiene.pdf",
  },
  {
    id: 2,
    title: "Formulario de Consentimiento",
    description:
      "Formato para autorización de procedimientos médicos y quirúrgicos.",
    url: "/docs/consentimiento_informado.pdf",
  },
  {
    id: 3,
    title: "Plan de Emergencias",
    description:
      "Guía para actuar en caso de siniestros, cortes de energía o evacuaciones.",
    url: "/docs/plan_emergencias.pdf",
  },
  {
    id: 4,
    title: "Manual de Usuario del Sistema",
    description:
      "Instrucciones de uso del software de gestión de turnos y pacientes.",
    url: "/docs/manual_usuario.pdf",
  },
];

export default function DocumentacionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const centroId = Number(id);
  const centro = rawData.find((c) => c.id === centroId);

  return (
    <Stack gap={6} px={6} py={8}>
      <TopbarCoponent
        title={{ name: `Documentacion de ${centro.name}` }}
        breadcrumb={[
          { text: "Inicio", onClick: () => navigate("/") },
          { text: "ABM Centros", onClick: () => navigate("/abm-salud") },
          {
            text: centro.name,
            onClick: () => navigate(`/abm-salud/detail/${centroId}`),
          },
          { text: "Documentacion", onClick: () => {} },
        ]}
      />
      <Text color="gray.600">
        Accedé a archivos y datos asociados al centro: habilitaciones,
        protocolos y otra información importante.
      </Text>

      <Stack gap={4}>
        {mockDocumentos.map((doc) => (
          <HStack key={doc.id} bg="gray.100" p={4} borderRadius="md" gap={4}>
            <Icon as={FaFilePdf} boxSize={6} color="red.500" />
            <Box flex="1">
              <Text fontWeight="semibold">{doc.title}</Text>
              <Text fontSize="sm" color="gray.600">
                {doc.description}
              </Text>
            </Box>

            <Button as="a" size="sm" colorPalette="teal">
              Descargar
            </Button>
          </HStack>
        ))}
      </Stack>
    </Stack>
  );
}
