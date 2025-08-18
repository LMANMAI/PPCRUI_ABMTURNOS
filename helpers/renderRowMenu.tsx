import React from "react";
import { Menu, Button, Box, Portal, IconButton } from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";

export type RowMenuOption =
  | {
      type?: "item";
      label: string;
      action?: (id: number) => void;
      icon?: React.ReactNode;
      disabled?: boolean;
      hidden?: boolean;
      confirmMessage?: string;
      value?: string;
      danger?: boolean;
    }
  | { type: "separator" };

type RowMenuConfig = {
  placement?: "bottom-end" | "bottom-start" | "top-end" | "top-start";
  trigger?: React.ReactNode;
  useIconTrigger?: boolean;
  buttonProps?: Partial<React.ComponentProps<typeof Button>>;
  iconButtonProps?: Partial<React.ComponentProps<typeof IconButton>>;
};

export function renderRowMenu(
  id: number,
  options: RowMenuOption[],
  config: RowMenuConfig = {}
): React.ReactNode {
  const {
    placement = "bottom-end",
    trigger,
    useIconTrigger = false,
    buttonProps,
    iconButtonProps,
  } = config;

  const cleaned = options.filter((o) => o.type === "separator" || !o.hidden);

  const handleClick =
    (opt: Extract<RowMenuOption, { type?: "item" }>) =>
    (e: React.MouseEvent) => {
      if (opt.disabled) return;
      if (opt.confirmMessage && !window.confirm(opt.confirmMessage)) return;
      opt.action?.(id);
    };

  const defaultTrigger = useIconTrigger ? (
    <IconButton
      aria-label="Opciones"
      size="xs"
      variant="ghost"
      {...iconButtonProps}
    >
      <FiMoreVertical />
    </IconButton>
  ) : (
    <Button
      size="sm"
      variant="plain"
      color="black"
      aria-label="Opciones"
      px={2}
      minW="auto"
      {...buttonProps}
    >
      <FiMoreVertical />
    </Button>
  );

  return (
    <Menu.Root positioning={{ placement }} data-row-menu>
      <Menu.Trigger>{trigger ?? defaultTrigger}</Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content asChild>
            <Box
              bg="white"
              borderRadius="md"
              boxShadow="md"
              py={2}
              minW="100px"
              border="1px solid"
              borderColor="gray.200"
            >
              {cleaned.map((opt, idx) =>
                opt.type === "separator" ? (
                  <Menu.Separator key={`sep-${idx}`} />
                ) : (
                  <Menu.Item
                    key={`item-${idx}`}
                    value={opt.value ?? `${opt.label}-${idx}`}
                    asChild
                    disabled={!!opt.disabled}
                  >
                    <Box
                      px={4}
                      py={2}
                      cursor={opt.disabled ? "not-allowed" : "pointer"}
                      _hover={opt.disabled ? {} : { bg: "gray.100" }}
                      fontWeight="normal"
                      color={opt.danger ? "red.600" : "gray.800"}
                      opacity={opt.disabled ? 0.5 : 1}
                      userSelect="none"
                      display="flex"
                      alignItems="center"
                      gap={2}
                      onClick={handleClick(opt)}
                    >
                      {opt.icon}
                      {opt.label}
                    </Box>
                  </Menu.Item>
                )
              )}
            </Box>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
