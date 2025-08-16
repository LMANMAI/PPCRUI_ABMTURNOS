import React from "react";
import { Center, Stack, Spinner, Text, Button } from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";

const LoadingOrError = ({
  isLoading,
  loadingText = "Cargando centro...",
}: {
  isLoading: boolean;
  error?: string | null;
  onRetry?: () => void;
  loadingText?: string;
}) => {
  if (isLoading) {
    return (
      <Center py={16}>
        <Stack align="center" gap={3}>
          <Spinner size="lg" />
          <Text color="gray.700">{loadingText}</Text>
        </Stack>
      </Center>
    );
  }
};
export default LoadingOrError;
