import { TextField } from "../../shared/fields/textfield";
import { Patient } from "../../../interfaces/patient.interface";
import { DarkCardContainer } from "../../shared/container/dark-card.component";
import { useForm } from "react-hook-form";
import { SelectInput } from "../../shared/fields/selectinput";
import { usePatientState } from "../../../stores/patient.store";
import { Alerts } from "../../../services/alerts/toastify";
import { AxiosError } from "axios";
import { Alert } from "@mui/material";
export const NewPatientForm = () => {
  const { handleSubmit,register, formState: {errors} } = useForm<Patient>();

  const addPatient = usePatientState((state) => state.addPatient);

  const onSubmit = async (data: Patient) => {
    try {
      await addPatient(data);
      Alerts.toastify("Paciente agregado correctamente", "success")
    } catch (e) {
      const error = e as AxiosError<any>;
      if(error?.response?.data.message.includes('email')) {
        Alerts.toastify('El correo electrónico ya está en uso', 'error')
      
      }else {
        Alerts.toastify(
          error?.response?.data?.message || "Error desconocido",
          "error"
        );
      }
     
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)} 
      className="flex w-full flex-col lg:flex-row">
      <DarkCardContainer width="w-1/2">
      {errors.name && <Alert severity="error">El nombre es requerido</Alert>}
        <TextField
          type="text"
          placeholder="Nombre"
          color="white"
          id="nombre"
          register={register("name", { required: true })}
        />
        {errors.lastName && <Alert severity="error">El apellido es requerido</Alert>}
        <TextField
          type="text"
          placeholder="Apellido"
          color="white"
          id="apellido"
          register={register("lastName", { required: true })}
        />
        {errors.email && <Alert severity="error">El correo electrónico es requerido</Alert>}
        <TextField
          type="text"
          placeholder="Correo electrónico"
          color="white"
          id="email"
          register={register("email", { required: true })}
        />
        {errors.gender && <Alert severity="error">El género es requerido</Alert>}
        <SelectInput
        color="white"
         register={register("gender", { required: true })}
        >
          <option className="text-black" value="">Selecciona un género</option>
          <option className="text-black" value="M">Masculino</option>
          <option className="text-black" value="F">Femenino</option>
          <option className="text-black" value="O">Otro</option>
        </SelectInput>
      </DarkCardContainer>

      <DarkCardContainer width="w-1/2">
      {errors.birthDate && <Alert severity="error">La fecha de nacimiento es requerida</Alert>}
        <TextField
          type="date"
          placeholder="Fecha de nacimiento"
          color="white"
          id="edad"
          register={register("birthDate", { required: true })}
        />
        {errors.phone && <Alert severity="error">El teléfono es requerido</Alert>}

        <TextField
          type="text"
          placeholder="Teléfono"
          color="white"
          id="telefono"
          register={register("phone", { required: true })}
        />
        {errors.address && <Alert severity="error">La dirección es requerida</Alert>}
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
