import React, { PropsWithChildren } from "react";
import { Box } from "@chakra-ui/react";

interface ChildrenMenuContainerProps {
  menuOpen: boolean;
}

const ChildrenMenuContainer: React.FC<
  PropsWithChildren<ChildrenMenuContainerProps>
> = ({ children, menuOpen }) => {
  return (
    <Box
      ml={menuOpen ? "250px" : "80px"}
      pt="60px"
      transition="margin 0.25s ease-in-out"
    >
      {children}
    </Box>
  );
};

export default ChildrenMenuContainer;
