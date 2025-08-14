import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import system from "../config/theme";
import { store } from "@/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </ChakraProvider>
  </StrictMode>
);
