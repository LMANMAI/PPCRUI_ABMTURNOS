import { defineConfig, createSystem, defaultConfig } from "@chakra-ui/react";

const customTheme = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
});

const system = createSystem(defaultConfig, customTheme);

export default system;
