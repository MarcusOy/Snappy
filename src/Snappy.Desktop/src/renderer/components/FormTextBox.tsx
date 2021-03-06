import { Input, InputProps } from "@chakra-ui/react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IFormControlProps } from "./Form";

interface IFormTextBoxProps extends IFormControlProps {
  inputProps: InputProps;
}

export const FormTextBox = (p: IFormTextBoxProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={p.name}
      defaultValue={p.defaultValue}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <Input
          name={name}
          ref={ref}
          onChange={onChange}
          onFocus={() => {
            if (!isTouched) isTouched = true;
          }}
          onBlur={onBlur}
          value={value}
          {...p.inputProps}
        />
      )}
    />
  );
};

export default FormTextBox;
