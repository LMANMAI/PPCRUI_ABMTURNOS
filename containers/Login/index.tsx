import React from "react";
import { Container, Box, Stack, Field, Input, Button } from "@chakra-ui/react";

const LoginPage = () => {
  return (
    <Container display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Box backgroundColor={"white"} padding={10} width={500} borderRadius={10}>
        <Stack color={"black"} my={2}>
          <Field.Root required>
            <Field.Label>
              Email <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="Enter your email" />
            <Field.HelperText>We'll never share your email.</Field.HelperText>
          </Field.Root>
        </Stack>
        <Stack color={"black"} my={2}>
          <Field.Root required>
            <Field.Label>
              Email <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="Enter your email" />
            <Field.HelperText>We'll never share your email.</Field.HelperText>
          </Field.Root>
        </Stack>
        <Button variant={"solid"} my={2}>
          Ingresar
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
