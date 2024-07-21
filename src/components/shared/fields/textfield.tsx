import { UseFormRegisterReturn } from "react-hook-form";
import React from "react";

interface Props {
  type: string;
  placeholder: string;
  id: string;
  color?: string;
  register: UseFormRegisterReturn;
  disable?: boolean
  defaultValue?: string
}

export const TextField = ({ type, placeholder, id, register, color, disable = false, defaultValue }: Props): React.JSX.Element | null => {
  let inputElement: React.JSX.Element | null = null;

  switch (type) {
    case "date":
      break;
    case "text":
      inputElement = (
        <input
        disabled={disable}
        id={id}
        type={type}
        value={defaultValue}
        placeholder={placeholder}
        className={`bg-transparent  text-${color} outline-none text-sm  w-full placeholder:text-neutral-400 text-semibold border-b-2 border-neutral-700 p-3`}
        {...register}
        />
      );
      break;
    case "datetime-local":
      inputElement = (
        <div>
          <label className={`text-${color} text-xs`} htmlFor={id}>{placeholder}</label>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            style={{colorScheme: type === 'datetime-local' ? 'dark' : undefined}}
            className={`bg-transparent  text-${color} outline-none text-sm  w-full placeholder:text-neutral-400 text-semibold border-b-2 border-neutral-700 p-3`}
            {...register}
          />
        </div>
      );
      break;
    default:
      inputElement = (
        <div>
          <label className={`text-${color} text-xs`} htmlFor={id}>{placeholder}</label>
          <input
            id={id}
            type="text"
            placeholder={placeholder}
            className={`bg-transparent  text-${color} outline-none text-sm  w-full placeholder:text-neutral-400 text-semibold border-b-2 border-neutral-700 p-3`}
            {...register}
          />
        </div>
      );
      break;
  }

  return inputElement;
};
