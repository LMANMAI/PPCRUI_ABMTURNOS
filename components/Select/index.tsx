import * as React from "react";
import { Field, Select, Portal, createListCollection } from "@chakra-ui/react";

export type SelectOption = { label: string; value: string };

type Props = {
  label: string;
  options: SelectOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  required?: boolean;
  multiple?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "subtle";
  width?: string | number;
  disabled?: boolean;
  clearable?: boolean;
};

const FormFieldSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Seleccionar...",
  required,
  multiple = false,
  size = "md",
  variant = "outline",
  width = "100%",
  disabled = false,
  clearable = true,
}: Props) => {
  const collection = React.useMemo(
    () => createListCollection({ items: options }),
    [options]
  );

  const valueArray: string[] = React.useMemo(() => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string" && value.length > 0) return [value];
    return [];
  }, [value]);

  const handleValueChange = (details: { value: string | string[] }) => {
    const nextArray = Array.isArray(details.value)
      ? details.value
      : details.value
      ? [details.value]
      : [];

    if (multiple) {
      onChange?.(nextArray);
    } else {
      onChange?.(nextArray[0] ?? "");
    }
  };

  return (
    <Field.Root required={required}>
      <Select.Root
        collection={collection}
        multiple={multiple}
        size={size}
        variant={variant}
        width={width}
        disabled={disabled}
        value={valueArray as any}
        onValueChange={handleValueChange}
      >
        <Select.HiddenSelect {...(multiple ? { multiple: true } : {})} />
        <Select.Label>{label}</Select.Label>

        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder={placeholder} />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
            {!multiple && clearable && <Select.ClearTrigger />}
          </Select.IndicatorGroup>
        </Select.Control>

        <Portal>
          <Select.Positioner>
            <Select.Content>
              {collection.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Field.Root>
  );
};

export default FormFieldSelect;
