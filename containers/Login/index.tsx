import React from "react";
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
  // InputLeftElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaRegEnvelope, FaLock, FaUser } from "react-icons/fa6";
import { useUserAD } from "../../context/authContext";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const { setUserAD, setAuthenticated } = useUserAD();
  const navigate = useNavigate();

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
            {/* {icono de ituzainfo} */}
            <Icon as={FaRegEnvelope} boxSize={12} color="gray.400" />
            <Heading size="md">Login to your account</Heading>
            <Text fontSize="sm" color="gray.500">
              Enter your details to login.
            </Text>
          </Stack>

          {/* <Divider my={4} /> */}

          <Stack>
            <InputGroup startElement={<FaUser />}>
              <Input placeholder="Username" />
            </InputGroup>
            <InputGroup startElement={<FaLock />}>
              <Input placeholder="Username" />
            </InputGroup>
            {/* <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="gray.400" />
              </InputLeftElement>
              <Input placeholder="Email Address" type="email" />
            </InputGroup>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaLock  color="gray.400" />
              </InputLeftElement>
              <Input placeholder="Password" type="password" />
            </InputGroup> */}

            <Flex justify="space-between" align="center">
              {/* <Checkbox colorScheme="gray">Keep me logged in</Checkbox> */}
              <Link fontSize="sm" color="blue.500">
                Forgot password?
              </Link>
            </Flex>

            <Button
              bgGradient="linear(to-r, gray.800, gray.900)"
              //color="white"
              _hover={{ bg: "gray.700", color: "white" }}
              variant={"subtle"}
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
              Login
            </Button>
          </Stack>

          <Text mt={10} fontSize="xs" textAlign="center" color="gray.400">
            © 2025 Metals.money
          </Text>
        </Box>
      </Flex>

      {/* Sección derecha - Testimonio */}
      <Flex
        display={{ base: "none", md: "flex" }}
        flex={1}
        align="center"
        justify="center"
        bg="gray.50"
        px={8}
      >
        <Box maxW="md" textAlign="left">
          <Text fontWeight="bold" fontSize="lg" mb={4}>
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
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
