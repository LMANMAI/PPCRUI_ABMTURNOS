import React from "react";
import { Box } from "@chakra-ui/react";

interface ModuleBoxProps {
  header: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function ModuleBox({ header, children, footer }: ModuleBoxProps) {
  return (
    <Box
      bg="white"
      borderRadius="md"
      boxShadow="sm"
      p={6}
      minH="300px"
      maxH={"70vh"}
      overflowY="auto"
      display={"flex"}
      flexDir={"column"}
    >
      <Box mb={6}>{header}</Box>
      <Box mb={6} flex={1} overflow={"auto"}>
        {children}
      </Box>
      <Box mt={6} textAlign="right">
        {footer}
      </Box>
    </Box>
  );
}
