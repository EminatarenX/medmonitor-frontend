import { TextField } from "../../shared/fields/textfield";
import { useForm } from "react-hook-form";
import { Patient } from "../../../interfaces/patient.interface";
import { WhiteCardContainer } from "../../shared/container/white-card.component";
import { SelectInput } from "../../shared/fields/selectinput";
import { DarkCardContainer } from "../../shared/container/dark-card.component";


export const NewPatientForm = () => {

  const { register } = useForm<Patient>();
  return (
    <form className="flex w-full flex-col lg:flex-row gap-2">
      <DarkCardContainer width="w-1/2">
        <TextField
          type="text"
          placeholder="Nombre"
          id="nombre"
          color="white"
          register={register("name", { required: true })}
        />
        <TextField
          type="text"
          placeholder="Apellido"
          id="apellido"
          color="white"
          register={register("lastName", { required: true })}
        />
        <TextField
          type="text"
          placeholder="Correo electrónico"
          id="email"
          color="white"
          register={register("email", { required: true })}
        />
        <SelectInput
         register={register("gender", { required: true })}
         color="white"
        >
          <option className="text-black" value="">Selecciona un género</option>
          <option className="text-black" value="M">Masculino</option>
          <option className="text-black" value="F">Femenino</option>
          <option className="text-black" value="O">Otro</option>
        </SelectInput>
      </DarkCardContainer>

      <DarkCardContainer width="w-1/2">
        <TextField
          type="date"
          placeholder="Fecha de nacimiento"
          id="edad"
          color="white"
          register={register("phone", { required: true })}
        />

        <TextField
          type="text"
          placeholder="Teléfono"
          id="telefono"
          color="white"
          register={register("phone", { required: true })}
        />
        <TextField
          type="text"
          placeholder="Dirección"
          color="white"
          id="direccion"
          register={register("address", { required: true })}
        />
        <input
          type="submit"
          value="Guardar"
          className="p-2 bg-sky-600 text-white font-bold text-lg"
        />
      </DarkCardContainer>
    </form>
  );
};
