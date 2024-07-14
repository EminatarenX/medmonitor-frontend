import { TextField } from "../../shared/fields/textfield";
import { DarkCardContainer } from "../../shared/container/dark-card.component";
import { useForm } from "react-hook-form";
import { SelectInput } from "../../shared/fields/selectinput";

interface Appointment {
    patient: string;
    date: string;
    time: string;
    symptoms: string;
}


export const NewAppointmentForm = () => {
  const { register } = useForm<Appointment>();
  return (
    <form className="flex w-full flex-col lg:flex-row">
      <DarkCardContainer width="w-1/2">
        <SelectInput
            register={register("patient", { required: true })}
            color="white"
        >
            <option className="text-black" value="">Selecciona un paciente</option>
            <option className="text-black" value="1">Paciente 1</option>
            <option className="text-black" value="2">Paciente 2</option>
            <option className="text-black" value="3">Paciente 3</option>
        </SelectInput>
        <textarea placeholder="Sintomas " className="bg-transparent  text-white outline-none text-sm  w-full placeholder:text-neutral-300 text-semibold border-b-2 border-neutral-700 p-3"
            rows={1}
            {...register("symptoms", { required: true })}
        />

      </DarkCardContainer>

      <DarkCardContainer width="w-1/2">
        <TextField
          type="datetime-local"
          placeholder="Fecha"
          color="white"
          id="edad"
          register={register("date", { required: true })}
        />


        <input type="submit" value="Guardar" className="p-2 bg-sky-600 text-white font-bold text-lg"/>
      </DarkCardContainer>
      
    </form>
  );
};
