import React from "react";
import { Control, Controller } from "react-hook-form";
import Input from "./Input";

type FormInputProps = {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  leftIcon?: any;
  rightIcon?: any;
  onRightIconPress?: () => void;
};

export default function FormInput({
  control,
  name,
  label,
  placeholder,
  secureTextEntry,
  leftIcon,
  rightIcon,
  onRightIconPress,
}: FormInputProps) {

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Input
          label={label}
          placeholder={placeholder}
          value={value ?? ""}              
          onChangeText={onChange}          
          secureTextEntry={secureTextEntry}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          onRightIconPress={onRightIconPress}
          error={error?.message || ""}
        />
      )}
    />
  );
}
