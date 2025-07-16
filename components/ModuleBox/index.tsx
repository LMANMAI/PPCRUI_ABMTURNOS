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
      maxH="60dvh"
      overflowY="auto"
    >
      {/* HEADER */}
      <Box mb={6}>{header}</Box>

      {/* CONTENT */}
      <Box mb={6}>{children}</Box>

      {/* FOOTER */}
      <Box mt={6} textAlign="right">
        {footer}
      </Box>
    </Box>
  );
}
