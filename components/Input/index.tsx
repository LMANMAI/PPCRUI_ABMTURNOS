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

  helperOverlay?: boolean;
  helperText?: React.ReactNode;
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
  helperText,
  helperOverlay,
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
          resize="none"
          disabled={isDisabled}
          {...textareaProps}
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

      {helperText ? (
        <Field.HelperText
          position={helperOverlay ? "absolute" : "static"}
          top={helperOverlay ? "100%" : undefined}
          mt={helperOverlay ? 1 : undefined}
        >
          {helperText}
        </Field.HelperText>
      ) : null}
    </Field.Root>
  );
};

export default FormFieldInput;
