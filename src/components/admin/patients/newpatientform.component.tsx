import { TextField } from "../../shared/fields/textfield";
import { useForm } from "react-hook-form";
import { Patient } from "../../../interfaces/patient.interface";
import { WhiteCardContainer } from "../../shared/container/white-card.component";
import { SelectInput } from "../../shared/fields/selectinput";
import { DarkCardContainer } from "../../shared/container/dark-card.component";
import { useEffect } from "react";
import { Doctor } from "../../../interfaces";
import { AxiosError } from "axios";
import { Alerts } from "../../../services/alerts/toastify";
import { usePatientState } from "../../../stores/patient.store";

interface Props {
  doctors: Record<string , Doctor>;
  getDoctors: () => void;

}


export const NewPatientForm = ({doctors, getDoctors}: Props) => {
 const addPatient = usePatientState( state => state.addPatientByHospital)

  useEffect(() => {
    const init = async () => {
      await getDoctors();
    }
    init();
  },[])

  const { register, handleSubmit } = useForm<Patient>();

  const onSubmitPatient = async (data: Patient) => {
    try {
        await addPatient(data);
        Alerts.toastify('Paciente agregado correctamente', 'success');
    } catch (error) {
      const err = error as AxiosError<any>;
      Alerts.toastify(err.response?.data.message[0] || 'Error desconocido', "error");
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmitPatient)} className="flex w-full flex-col lg:flex-row gap-2">
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
        <SelectInput 
          register={register("doctorId", { required: true })}
          color="white"
        >
          <option className="text-black" value="">Selecciona un doctor</option>
          {Object.values(doctors).map(doctor => (
            <option className="text-black" key={doctor.id} value={doctor.id}>{doctor.name} {doctor.lastName}</option>
          ))}
        </SelectInput>
      </DarkCardContainer>

      <DarkCardContainer width="w-1/2">
        <TextField
          type="date"
          placeholder="Fecha de nacimiento"
          id="edad"
          color="white"
          register={register("birthDate", { required: true })}
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
