import React, { PropsWithChildren, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import {
  ChildrenMenuContainer,
  MenuItemComponent,
  NavBarComponent,
} from "../index";
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../store";
import { selectIsAuthenticated } from "../../features/authSlice";

interface SideMenuLayoutProps extends PropsWithChildren<any> {}

const SideMenuLayout: React.FC<SideMenuLayoutProps> = ({ children }: any) => {
  const [menuOpen, setMenuOpen] = useState(true);
  const authenticated = useAppSelector(selectIsAuthenticated);

  if (!authenticated) return <Navigate to="/login" replace />;

  return (
    <>
      <NavBarComponent />
      <Box
        height="100%"
        bg="#f1f1f1"
        position="fixed"
        width={menuOpen ? "250px" : "80px"}
        borderRight="1px solid #ccc"
        transition="width 0.15s ease-in-out"
        boxSizing="border-box"
        padding="20px 15px"
        pt="75px"
      >
        <MenuItemComponent isOpen={menuOpen} isOpenFn={setMenuOpen} />
      </Box>

      <ChildrenMenuContainer menuOpen={menuOpen}>
        <Box
          as={"main"}
          bg={"white"}
          minHeight={"calc(100vh - 60px)"}
          color={"black"}
          p={2}
        >
          <Outlet />
        </Box>
      </ChildrenMenuContainer>
    </>
  );
};

export default SideMenuLayout;
