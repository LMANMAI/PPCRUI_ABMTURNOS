import React, { PropsWithChildren, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import {
  ChildrenMenuContainer,
  MenuItemComponent,
  NavBarComponent,
} from "../index";

interface SideMenuLayoutProps extends PropsWithChildren<any> {}

const SideMenuLayout: React.FC<SideMenuLayoutProps> = ({ children }: any) => {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <>
      <NavBarComponent />

      <Box
        height="100%"
        bg="#f1f1f1"
        position="fixed"
        width={menuOpen ? "250px" : "80px"}
        borderRight="1px solid #ccc"
        transition="width 0.2s ease-in-out"
        boxSizing="border-box"
        padding="20px 15px"
        pt="75px"
      >
        <MenuItemComponent isOpen={menuOpen} isOpenFn={setMenuOpen} />
      </Box>

      <ChildrenMenuContainer menuOpen={menuOpen}>
        {children}
      </ChildrenMenuContainer>
    </>
  );
};

export default SideMenuLayout;
