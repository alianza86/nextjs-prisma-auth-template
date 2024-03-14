"use client";

interface SelectFieldProps {
  name: string;
  label: string;
  selectOptions: { value: any; label: string }[];
  defaultValue?: any;
  errors: any;
}

export default function SelectField({
  name,
  label,
  selectOptions,
  defaultValue,
  errors,
}: SelectFieldProps) {
  return (
    <>
      <label className="text-slate-400 mb-2 block text-sm">{label}:</label>
      <select
        name={name}
        defaultValue={defaultValue}
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
        <span className="text-red-500 text-xs">{errors[name]._errors[0]}</span>
      )}
    </>
  );
}
