import { Link } from "react-router-dom"
import AddIcon from '@mui/icons-material/Add';

export const DoctorsHeader = () => {
  return (
    <header className="bg-neutral-900 text-neutral-100 px-6 py-8 rounded-lg shadow-md">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-neutral-100">
            Doctores
          </h1>
          <p className="text-neutral-400 text-sm lg:text-base">
            Revisa los doctores que tienes registrados
          </p>
        </div>
        <Link 
          to="/admin/doctors/new" 
          className="inline-flex items-center px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 rounded-md transition-colors duration-300 ease-in-out shadow-sm"
        >
          <AddIcon className="w-5 h-5 mr-2 text-neutral-400" />
          <span className="font-medium">Agregar Doctor</span>
        </Link>
      </div>
    </header>
  )
}