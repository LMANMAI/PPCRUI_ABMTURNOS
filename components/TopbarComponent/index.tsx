import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Portal,
  Text,
  Breadcrumb,
  Menu,
} from "@chakra-ui/react";
// import * as Breadcrumb from "@chakra-ui/react/components/breadcrumb";
// import * as Menu from "@chakra-ui/react/components/menu";
import { FiMoreVertical } from "react-icons/fi";
import { LiaSlashSolid } from "react-icons/lia";

interface BreadcrumbItemType {
  text: string;
  onClick?: () => void;
}

interface ButtonItemType {
  text: string;
  onClick: () => void;
  variant?: "solid" | "outline" | "ghost";
  colorScheme?: string;
}

interface MenuItemType {
  label: string;
  onClick: () => void;
  isDanger?: boolean;
}

interface TopbarProps {
  title: {
    name: string;
    element?: "h1" | "h2" | "h3";
  };
  breadcrumb: BreadcrumbItemType[];
  buttonList?: ButtonItemType[];
  menuOptions?: MenuItemType[];
  className?: string;
}

const TopbarComponent: React.FC<TopbarProps> = ({
  title,
  breadcrumb,
  buttonList = [],
  menuOptions = [],
  className = "",
}) => {
  const TitleComponent = title.element || "h1";

  return (
    <Flex
      className={className}
      align="center"
      justify="space-between"
      // px={4}
      py={3}
      bg="white"
      // borderBottom="1px solid #e2e8f0"
      gap={4}
    >
      <Box>
        <Breadcrumb.Root>
          <Breadcrumb.List>
            {breadcrumb.map((item, idx) => (
              <React.Fragment key={idx}>
                <Breadcrumb.Item>
                  {idx === breadcrumb.length - 1 ? (
                    <Breadcrumb.CurrentLink color={"black"}>
                      {item.text}
                    </Breadcrumb.CurrentLink>
                  ) : (
                    <Breadcrumb.Link
                      onClick={item.onClick}
                      cursor={item.onClick ? "pointer" : "default"}
                      color={"black"}
                    >
                      {item.text}
                    </Breadcrumb.Link>
                  )}
                </Breadcrumb.Item>
                {idx !== breadcrumb.length - 1 && (
                  <Breadcrumb.Separator>
                    <LiaSlashSolid />
                  </Breadcrumb.Separator>
                )}
              </React.Fragment>
            ))}
          </Breadcrumb.List>
        </Breadcrumb.Root>

        <Heading as={TitleComponent} size="md" mt={1}>
          {title.name}
        </Heading>
      </Box>

      <Stack direction="row" align="center">
        {buttonList.map((btn, idx) => (
          <Button
            key={idx}
            size="sm"
            onClick={btn.onClick}
            variant={btn.variant || "solid"}
            colorPalette={btn.colorScheme || "cyan"}
          >
            {btn.text}
          </Button>
        ))}

        {menuOptions.length > 0 && (
          <Menu.Root>
            <Menu.Trigger>
              <Button
                size="sm"
                variant="plain"
                color="black"
                aria-label="Opciones"
                px={2}
                minW="auto"
              >
                <FiMoreVertical />
              </Button>
            </Menu.Trigger>

            <Portal>
              <Menu.Positioner>
                <Menu.Content asChild>
                  <Box
                    bg="white"
                    borderRadius="md"
                    boxShadow="md"
                    py={2}
                    minW="200px"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    {menuOptions.map((item, idx) => (
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
        )}
      </Stack>
    </Flex>
  );
};

export default TopbarComponent;
