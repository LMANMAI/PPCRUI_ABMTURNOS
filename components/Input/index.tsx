import * as React from "react";
import { Field, Input, Textarea } from "@chakra-ui/react";

type FormFieldInputProps = {
  label: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  value?: string | number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  textarea?: boolean;
  name?: string;
  inputProps?: Omit<
    React.ComponentProps<typeof Input>,
    "value" | "onChange" | "placeholder" | "type"
  >;
  textareaProps?: Omit<
    React.ComponentProps<typeof Textarea>,
    "value" | "onChange" | "placeholder"
  >;
  isDisabled?: boolean;
};

const FormFieldInput = ({
  label,
  required,
  placeholder,
  type = "text",
  value,
  onChange,
  textarea = false,
  name,
  inputProps,
  textareaProps,
  isDisabled = false,
}: FormFieldInputProps) => {
  return (
    <Field.Root required={required}>
      <Field.Label>{label}</Field.Label>
      {textarea ? (
        <Textarea
          name={name}
          placeholder={placeholder}
          value={value as string | undefined}
          onChange={onChange}
          {...textareaProps}
          resize="none"
          disabled={isDisabled}
        />
      ) : (
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value as string | number | undefined}
          onChange={onChange}
          disabled={isDisabled}
          {...inputProps}
        />
      )}
    </Field.Root>
  );
};
export default FormFieldInput;
