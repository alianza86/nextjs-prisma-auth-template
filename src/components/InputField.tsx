"use client";

interface InputFieldProps {
  name: string;
  type?: string;
  label: string;
  defaultValue?: any;
  errors?: any;
}

export default function InputField({
  name,
  type,
  label,
  defaultValue,
  errors,
}: InputFieldProps) {
  return (
    <>
      <label className="text-slate-400 mb-2 block text-sm">{label}:</label>
      <input
        name={name}
        defaultValue={defaultValue}
        type={type || "text"}
        className="p-3 rounded block mb-2 bg-slate-700 text-slate-300 w-full outline-none"
      />
      {errors[name] && (
        <span className="text-red-500 text-xs">{errors[name]._errors[0]}</span>
      )}
    </>
  );
}
