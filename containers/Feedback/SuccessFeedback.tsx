import {
  Box,
  Container,
  Stack,
  Heading,
  Text,
  Button,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FiCheckCircle } from "react-icons/fi";

type RequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "APPLIED";

type SuccessFeedbackProps = {
  message: string;
  title?: string;
  status?: RequestStatus;
  idLabel?: string;
  idValue?: string | number;
  primaryText?: string;
  onPrimary?: () => void;
  secondaryText?: string;
  onSecondary?: () => void;
  compact?: boolean;
};

export default function SuccessFeedback({
  message,
  title = "¡Solicitud enviada!",
  primaryText = "Volver al inicio",
  onPrimary,
  secondaryText,
  onSecondary,
  compact = false,
}: SuccessFeedbackProps) {
  const Content = (
    <Stack align="center" gap={4} textAlign="center">
      <Icon as={FiCheckCircle} boxSize={10} color="green.500" />
      <Heading size="lg">{title}</Heading>

      <Text maxW="xl">{message}</Text>

      <HStack gap={3} justify="center">
        <Button colorPalette={"teal"} onClick={onPrimary}>
          {primaryText}
        </Button>
        {secondaryText && onSecondary && (
          <Button variant="outline" onClick={onSecondary}>
            {secondaryText}
          </Button>
        )}
      </HStack>
    </Stack>
  );

  if (compact) return <Box>{Content}</Box>;

  return (
    <Container maxW="3xl" px={4}>
      <Stack minH="calc(100dvh - 70px)" align="center" justify="center">
        {Content}
      </Stack>
    </Container>
  );
}
