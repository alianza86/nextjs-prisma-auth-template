"use client";

import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

const errorMessages: { [key: string]: string } = {
  required: " is required",
};

const getErrorMessage = ({
  label,
  value,
  key,
}: {
  label: string;
  value: any;
  key: string;
}): string => {
  switch (key) {
    case "required":
      return label + " is required";
    case "max":
      return label + " cannot be more than " + value;
    case "min":
      return label + " cannot be less than " + value;
    case "maxLength":
      return label + " cannot be more than " + value + " characters";
    case "minLength":
      return label + " cannot be less than " + value + " characters";
    default:
      return label + " is invalid";
  }
};

interface Validations {
  required?: boolean;
  max?: number;
  min?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  [key: string]: any;
}

interface InputFieldProps {
  name: string;
  type?: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  options?: RegisterOptions;
  errors: FieldErrors;
  validations?: Validations;
}

export default function InputField({
  name,
  type,
  label,
  register,
  validations,
  options,
  errors,
}: InputFieldProps) {
  const newOptions: any = {};

  if (validations) {
    Object.keys(validations).forEach((key: string) => {
      const message = getErrorMessage({ label, key, value: validations[key] });

      newOptions[key] = {
        value: validations[key],
        message,
      };
    });
  }

  return (
    <>
      <label htmlFor={name} className="text-slate-400 mb-2 block text-sm">
        {label}:
      </label>
      <input
        type={type || "text"}
        {...register(name, options || newOptions)}
        className="p-3 rounded block mb-2 bg-slate-700 text-slate-300 w-full outline-none"
      />
      {errors[name] && (
        <span className="text-red-500 text-xs">
          {errors[name]?.message as string}
        </span>
      )}
    </>
  );
}
