import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class">
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </StrictMode>
);
