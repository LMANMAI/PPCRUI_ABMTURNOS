import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  //Divider,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaRegEnvelope, FaLock, FaUser } from "react-icons/fa6";
import { useUserAD } from "../../context/authContext";
import { useNavigate } from "react-router";

import { loginSuccess } from "../../features/authSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const canSubmit = username.trim() !== "" && password.trim() !== "";

  const handleLogin = () => {
    setLoading(true);
    const mockUser = {
      username: username,
      name: "USER PRUEBA",
      groups: [""],
      legajo: "l0000001",
      account: {},
      suc: [],
    };
    dispatch(loginSuccess(mockUser));
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1200);
  };

  return (
    <Flex height="100vh" width="100%">
      {/* Sección izquierda - Formulario */}
      <Flex
        flex={1}
        justify="center"
        align="center"
        bg="white"
        px={{ base: 6, md: 16 }}
      >
        <Box width="100%" maxW="400px">
          <Stack align="center" mb={6}>
            {/* {icono de ituzaingo} */}
            {/* <Icon as={FaRegEnvelope} boxSize={12} color="gray.400" /> */}
            <Image
              src="/itubrand.png"
              alt="Logo Ituzaingó"
              width={100}
              height={100}
              objectFit="contain"
            />
            <Heading size="md">Centros medicos Ituzaingo</Heading>
            <Text fontSize="sm" color="gray.500">
              Ingresa a tu cuenta y comienza a administrar tu centro de salud
            </Text>
          </Stack>

          <Stack>
            <InputGroup startElement={<FaUser />}>
              <Input
                placeholder="Legajo o mail"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
            <InputGroup startElement={<FaLock />}>
              <Input
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>

            <Flex justify="space-between" align="center">
              <Link fontSize="sm" color="blue.500">
                ¿Olvidaste tu contraseña?
              </Link>
            </Flex>

            <Button
              bgGradient="linear(to-r, gray.800, gray.900)"
              disabled={!canSubmit || loading}
              _hover={{ color: "white" }}
              variant={"solid"}
              loading={loading}
              colorPalette={"teal"}
              onClick={() => {
                handleLogin();
              }}
            >
              Ingresar
            </Button>
          </Stack>

          <Text mt={10} fontSize="xs" textAlign="center" color="gray.400">
            © 2025 Practicas profesionalisantes
          </Text>
        </Box>
      </Flex>

      {/* Sección derecha  */}
      <Flex
        display={{ base: "none", md: "flex" }}
        flex={1}
        align="center"
        justify="center"
        bg="teal.500"
        px={8}
      >
        <Box maxW="md" textAlign="left">
          {/* <Text fontWeight="bold" fontSize="lg" mb={4}>
            The Marketing Management app has revolutionized our tasks.{" "}
            <Text as="span" fontWeight="normal" color="gray.600">
              It's efficient and user-friendly, streamlining planning to
              tracking.
            </Text>
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            Wei Chen
          </Text>
          <Text fontSize="sm" color="gray.500">
            CEO / Catalyst
          </Text> */}
        </Box>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
