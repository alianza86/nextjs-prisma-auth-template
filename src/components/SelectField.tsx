"use client";

import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

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

interface SelectFieldProps {
  name: string;
  label: string;
  selectOptions: { value: any; label: string }[];
  register: UseFormRegister<FieldValues>;
  options?: RegisterOptions;
  errors: FieldErrors;
  validations?: Validations;
}

export default function SelectField({
  name,
  label,
  selectOptions,
  register,
  validations,
  options,
  errors,
}: SelectFieldProps) {
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
      <label className="text-slate-400 mb-2 block text-sm">{label}:</label>
      <select
        {...register(name, options || newOptions)}
        className="p-3 rounded block mb-2 bg-slate-700 text-slate-300 w-full outline-none"
      >
        <option value="">Select</option>
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {errors[name] && (
        <span className="text-red-500 text-xs">
          {errors[name]?.message as string}
        </span>
      )}
    </>
  );
}
