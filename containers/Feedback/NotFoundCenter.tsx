import React from "react";
import {
  Center,
  Stack,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Code,
} from "@chakra-ui/react";
import { FiArrowLeft, FiRefreshCw } from "react-icons/fi";

type Props = {
  id?: string | number;
  onBack?: () => void;
  onRetry?: () => void;
  onGoList?: () => void;
};

const NotFoundCenter: React.FC<Props> = ({ id, onBack, onRetry, onGoList }) => (
  <Center py={16}>
    <Stack align="center" textAlign="center" gap={4}>
      <Heading size="md" color="black">
        Centro no encontrado
      </Heading>
      <Text color="gray.700" textAlign={"left"} width={"90%"}>
        No pudimos encontrar la información del centro solicitado.Puede que el
        centro haya sido eliminado, el enlace esté incorrecto o la solicitud
        siga pendiente.
      </Text>
      {id != null && (
        <Text fontSize="sm" color="gray.600">
          ID consultado: <Code>{id}</Code>
        </Text>
      )}

      <ButtonGroup mt={2} gap={3}>
        <Button colorPalette="teal" onClick={onBack}>
          <FiArrowLeft /> Volver
        </Button>
        <Button colorPalette="teal" variant="outline" onClick={onRetry}>
          <FiRefreshCw /> Reintentar
        </Button>
      </ButtonGroup>
    </Stack>
  </Center>
);

export default NotFoundCenter;
