import {UseFormRegisterReturn} from 'react-hook-form'
interface Props { 
    children: React.ReactNode;
    color?: string;
    register: UseFormRegisterReturn
}
export const SelectInput = ({ children, color, register}: Props): React.JSX.Element => {
  return (
  <select {...register} className={`bg-transparent  text-${color} outline-none text-sm  w-full placeholder:text-neutral-300 text-semibold border-b-2 border-neutral-700 p-3`}>
        {children}
      </select>
  )
}
