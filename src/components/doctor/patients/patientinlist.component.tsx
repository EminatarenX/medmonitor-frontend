
import { LaunchRounded as LaunchRoundedIcon } from "@mui/icons-material";
import { Patient } from "../../../interfaces/patient.interface";
import { useNavigate } from "react-router-dom";
interface Props {
  patient: Patient
}
export const PatientInList = ({ patient }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between w-full p-3 bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:bg-gray-700">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 bg-gray-700 rounded-full overflow-hidden">
          <img src={patient.gender === 'M' ? '/man.svg': '/woman.svg'} alt="Patient" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-semibold">{patient.name} {patient.lastName}</span>
          <span className="text-gray-400 text-sm">Hace 2 horas</span>
        </div>
      </div>
      <button
        onClick={() => navigate(`/doctor/patients/${patient.id}`)} 
        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200">
        <LaunchRoundedIcon className="text-gray-400" />
      </button>
    </div>
  )
}