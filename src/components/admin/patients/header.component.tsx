import { Link } from "react-router-dom"
import AddIcon from '@mui/icons-material/Add';

export const PatientsHeader = () => {
  return (
    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-neutral-700 py-6 px-8 bg-neutral-800">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-100">
          Pacientes
        </h1>
        <p className="text-neutral-400 mt-2">
          Revisa los pacientes que tienes registrados
        </p>
      </div>
      <Link to={'/admin/patients/new'} className="mt-4 lg:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-neutral-700 text-neutral-100 rounded-md font-semibold transition-colors duration-300 hover:bg-neutral-600">
        <AddIcon className="w-5 h-5" />
        Agregar Paciente
      </Link>
    </header>
  )
}