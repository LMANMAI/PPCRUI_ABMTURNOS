import React from "react";
import { Avatar, Stack, Text, Flex, Menu, Portal, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/authSlice";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogged = useSelector(selectUser);

  const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"];

  const pickPalette = (name: string) => {
    const index = name.charCodeAt(0) % colorPalette.length;
    return colorPalette[index];
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("authToken");
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const menuItems: Array<{
    label: string;
    isDanger?: boolean;
    onClick?: () => void;
  }> = [{ label: "Salir", isDanger: true, onClick: handleLogout }];

  return (
    <Flex
      as="nav"
      p={3}
      bg="white"
      justify="flex-end"
      align="center"
      position="fixed"
      top={0}
      width="100%"
      zIndex={99}
      borderBottom="1px solid #ccc"
    >
      <Menu.Root>
        <Menu.Trigger>
          <Stack direction="row-reverse" align="center" cursor="pointer">
            <Avatar.Root colorPalette={pickPalette("Usuario Apellido")}>
              <Avatar.Fallback name="Usuario Apellido" />
            </Avatar.Root>
            <Text color="black" fontSize="sm">
              {userLogged.user.name}
            </Text>
          </Stack>
        </Menu.Trigger>

        <Portal>
          <Menu.Positioner>
            <Menu.Content asChild>
              <Box
                bg="white"
                borderRadius="md"
                boxShadow="md"
                py={2}
                minW="240px"
                border="1px solid"
                borderColor="gray.200"
              >
                {menuItems.map((item, idx) => (
                  <Menu.Item key={idx} value={item.label} asChild>
                    <Box
                      px={4}
                      py={2}
                      cursor="pointer"
                      _hover={{ bg: "gray.100" }}
                      fontWeight={item.isDanger ? "semibold" : "normal"}
                      color={item.isDanger ? "red.500" : "gray.800"}
                      onClick={item.onClick}
                    >
                      {item.label}
                    </Box>
                  </Menu.Item>
                ))}
              </Box>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Flex>
  );
};

export default Navbar;
