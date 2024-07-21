import { TextField } from "../../shared/fields/textfield";
import { DarkCardContainer } from "../../shared/container/dark-card.component";
import { useForm } from "react-hook-form";
import { SelectInput } from "../../shared/fields/selectinput";
import { Patient } from "../../../interfaces/patient.interface";
import { useMonitorState } from "../../../stores/monitor/monitor.store";
import { Alerts } from "../../../services/alerts/toastify";
import { AxiosError } from "axios";

interface Props {
  patients: Record<string, Patient>;
}

export const NewMonitorForm = ({ patients }: Props) => {
  const createMonitor = useMonitorState( state => state.addMonitor);
  const { register, handleSubmit } = useForm<{patientId: string, channel: string}>();
  const onSubmitMonitor = async (data: { patientId: string, channel: string}) => {
    try {
      await createMonitor(data.patientId, data.channel);
      Alerts.toastify('Monitor creado', 'success');
    } catch (e) {
      const error = e as AxiosError<any>;
      console.log(error)
      Alerts.toastify(error.response?.data.message, 'error');
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmitMonitor)} className="flex w-full flex-col lg:flex-row">
      <DarkCardContainer width="w-1/2">
        <SelectInput
          register={register("patientId", { required: true })}
          color="white"
        >
          <option value="" className="text-gray-900">
            Selecciona un paciente
          </option>
          {Object.values(patients).map((patient) => (
            <option className="text-gray-900 "  key={patient.id} value={patient.id}>
              {patient.name + " " + patient.lastName} 
            </option>
          ))}
        </SelectInput>
        <TextField placeholder="Canal de entrada de datos" type="text" id="channel" color="white" register={register('channel')}/>
       
      </DarkCardContainer>

      <DarkCardContainer width="w-1/2">
       
        <input
          type="submit"
          value="Guardar"
          className="p-2 bg-sky-600 text-white font-bold text-lg"
        />
      </DarkCardContainer>
    </form>
  );
};
