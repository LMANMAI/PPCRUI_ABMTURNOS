// containers/Feedback/SuccessFeedback.tsx
import React from "react";
import {
  Box,
  Card,
  Container,
  Stack,
  Heading,
  Text,
  Button,
  HStack,
  Code,
  Icon,
  Tag,
  Separator,
} from "@chakra-ui/react";
import { FiCheckCircle } from "react-icons/fi";

type RequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "APPLIED";

type SuccessFeedbackProps = {
  /** Mensaje principal (ej: “Tu solicitud quedó pendiente de aprobación.”) */
  message: string;
  /** Título opcional */
  title?: string;
  /** Mostrar etiqueta de estado (opcional) */
  status?: RequestStatus;
  /** Muestra un ID (opcional) */
  idLabel?: string;
  idValue?: string | number;
  /** Acción primaria */
  primaryText?: string;
  onPrimary?: () => void;
  /** Acción secundaria (opcional) */
  secondaryText?: string;
  onSecondary?: () => void;
  /** Si querés que ocupe ancho contenido en vez de full container */
  compact?: boolean;
};

const StatusTag = ({ status }: { status: RequestStatus }) => {
  const color =
    status === "PENDING"
      ? "yellow"
      : status === "APPROVED"
      ? "green"
      : status === "REJECTED"
      ? "red"
      : "blue";
  const label =
    status === "PENDING"
      ? "Pendiente"
      : status === "APPROVED"
      ? "Aprobada"
      : status === "REJECTED"
      ? "Rechazada"
      : "Aplicada";

  return (
    <Tag.Root colorPalette={color} size="md" variant="subtle">
      <Tag.Label>{label}</Tag.Label>
    </Tag.Root>
  );
};

export default function SuccessFeedback({
  message,
  title = "¡Solicitud enviada!",
  status,
  idLabel,
  idValue,
  primaryText = "Aceptar",
  onPrimary,
  secondaryText,
  onSecondary,
  compact = false,
}: SuccessFeedbackProps) {
  const Content = (
    <Card.Root>
      <Card.Header>
        <HStack align="center" gap={3}>
          <Icon as={FiCheckCircle} boxSize={8} color="green.500" />
          <Heading size="lg">{title}</Heading>
        </HStack>
        <Stack gap={2} mt={2}>
          <Text>{message}</Text>
          {status && <StatusTag status={status} />}
        </Stack>
      </Card.Header>

      <Card.Body>
        <Stack gap={4}>
          {idValue != null && (
            <Stack gap={1}>
              <Text color="fg.muted" fontWeight="medium">
                {idLabel || "ID de solicitud"}
              </Text>
              <Code fontSize="md" px={2} py={1} borderRadius="md">
                {idValue}
              </Code>
            </Stack>
          )}

          <Separator />

          <HStack gap={3}>
            <Button onClick={onPrimary}>{primaryText}</Button>
            {secondaryText && onSecondary && (
              <Button variant="outline" onClick={onSecondary}>
                {secondaryText}
              </Button>
            )}
          </HStack>
        </Stack>
      </Card.Body>
    </Card.Root>
  );

  if (compact) return <Box>{Content}</Box>;
  return (
    <Container maxW="2xl" py={12}>
      {Content}
    </Container>
  );
}
