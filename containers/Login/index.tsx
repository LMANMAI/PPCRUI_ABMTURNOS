import React from "react";
import { Container, Box, Stack, Field, Input, Button } from "@chakra-ui/react";
import { useUserAD } from "../../context/authContext";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const { setUserAD, setAuthenticated } = useUserAD();
  let navigate = useNavigate();

  return (
    <Container
      display={"flex"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
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
        <Stack>
          <Button
            variant={"solid"}
            colorPalette={"cyan"}
            my={2}
            onClick={() => {
              setUserAD({
                username: "USERPRUEBA@correo.com",
                name: "USER PRUEBA",
                groups: [""],
                legajo: "l0000001",
                account: {},
                suc: [],
              });
              setAuthenticated(true);
              navigate("/");
            }}
          >
            Ingresar
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default LoginPage;
