import { Box, Button, Stack, Icon } from "@chakra-ui/react";
import { MenuOptionList } from "./statics";
import { useNavigate } from "react-router";
import { FaAlignJustify, FaChevronLeft } from "react-icons/fa6";
import * as FaIcons from "react-icons/fa6";

const MenuItem = ({
  isOpen,
  isOpenFn,
}: {
  isOpen: boolean;
  isOpenFn: (value: boolean) => void;
}) => {
  let navigate = useNavigate();
  const currentPath = window.location.pathname;

  return (
    <Box py={4}>
      <Stack alignItems={"flex-end"}>
        <Button
          onClick={() => isOpenFn(!isOpen)}
          size="sm"
          width={"fit-content"}
          variant={"plain"}
        >
          <Icon size="lg" color="teal">
            {isOpen ? <FaChevronLeft /> : <FaAlignJustify />}
          </Icon>
        </Button>
      </Stack>

      <Stack marginTop={150}>
        {MenuOptionList.map((item: any) => {
          const IconComponent = FaIcons[item.icon as keyof typeof FaIcons];
          const selected = item.path === currentPath;

          return (
            <Button
              key={item.path}
              onClick={() => navigate(item.path)}
              variant="ghost"
              justifyContent={isOpen ? "flex-start" : "center"}
              w={isOpen ? "100%" : "auto"}
              p={3}
              bg={selected ? "white" : "transparent"}
              color={selected ? "teal.500" : "gray.800"}
              _hover={{ bg: selected ? "white" : "gray.100" }}
            >
              <Icon size="lg" color="teal">
                <IconComponent />
              </Icon>
              {isOpen ? (
                <Stack as={"span"} width={"100%"} textAlign={"start"}>
                  {item.label}
                </Stack>
              ) : null}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};

export default MenuItem;
