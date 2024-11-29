import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./form";
import { Control, FieldValues } from "react-hook-form";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Textarea } from "./textarea";

export interface FormConfigControl {
  name: string;
  label?: string;
  type: ControlType;
  class?: string;
  value?: string;
  placeholder?: string;
  options?: SelectOption[] | any[];
  emptyOption?: boolean;
  asyncOptions?: AsyncOptions;
  uppercase?: boolean;
  currency?: boolean;
  percent?: boolean;
  autofocus?: boolean;
  disabled?: boolean;
  tabskip?: boolean;
  hidden?: true;
  lines?: number;
  autocompleteDisplayFieldName?: string;
}

export interface FormConfig {
  [name: string]: FormConfigControl;
}

interface SelectOption {
  value: string;
  displayValue: string;
}

export interface AsyncOptions {
  idField: string;
  displayValues: string[];
}

type ControlType =
  | "text"
  | "password"
  | "select"
  | "email"
  | "number"
  | "date"
  | "producto"
  | "textarea"
  | "autocomplete";

interface DynamicInputProps {
  config: FormConfigControl;
  control: Control<any> | undefined;
  className: string;
}

const DynamicInput = ({ config, control, className }: DynamicInputProps) => {
  if (config.type === "autocomplete") return <div></div>;

  if (config.type === "select" && config.options)
    return (
      <FormField
        control={control}
        name={config.name}
        render={({ field }) => (
          <FormItem className={className}>
            {config.label && <FormLabel>{config.label}</FormLabel>}
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={config.value || field.value}
              >
                {config.placeholder && config.placeholder !== "" && (
                  <SelectTrigger className="">
                    <SelectValue placeholder={config.placeholder} />
                  </SelectTrigger>
                )}
                <SelectContent>
                  {config.emptyOption && (
                    <SelectItem key={null} value={null!}>
                      {config.placeholder}
                    </SelectItem>
                  )}
                  {config.asyncOptions &&
                    config.options?.map((option: any) => (
                      <SelectItem
                        key={option[config.asyncOptions!.idField]}
                        value={option[config.asyncOptions!.idField]}
                      >
                        {config
                          .asyncOptions!.displayValues.map((key) => option[key])
                          .join(" - ")}
                      </SelectItem>
                    ))}
                  {!config.asyncOptions &&
                    config.options?.map(({ value, displayValue }) => (
                      <SelectItem key={value} value={value}>
                        {displayValue}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );

  if (config.type === "textarea")
    return (
      <FormField
        control={control}
        name={config.name}
        render={({ field }) => (
          <FormItem className={className}>
            <FormLabel>{config.label}</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                rows={config.lines}
                placeholder={config.placeholder}
                readOnly={config.disabled}
                tabIndex={config.tabskip ? -1 : undefined}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );

  return (
    <FormField
      control={control}
      name={config.name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{config.label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={config.type}
              placeholder={config.placeholder}
              readOnly={config.disabled}
              tabIndex={config.tabskip ? -1 : undefined}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { DynamicInput };
