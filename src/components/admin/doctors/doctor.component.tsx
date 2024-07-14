import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Link } from "react-router-dom";
import { Doctor } from "../../../interfaces";

interface Props {
  doctor: Doctor;
}

export const DoctorComponent = ({ doctor }: Props) => {
  const { id, name, specialty, lastName, gender } = doctor;

  return (
    <div className="relative bg-neutral-800 flex items-center justify-between rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:bg-neutral-700 hover:shadow-lg">
      <Link to={`/admin/doctors/${id}`} className="absolute inset-0 z-10 lg:hidden">
        <span className="sr-only">Ver detalles de {name} {lastName}</span>
      </Link>
      
      <div className="flex items-center space-x-4 p-4">
        <img
          className="w-16 h-16 rounded-full object-cover bg-neutral-700"
          src={gender === "M" ? "/man.svg" : "/woman.svg"}
          alt={`Avatar de ${name} ${lastName}`}
        />
        
        <div>
          <h2 className="text-lg font-semibold text-neutral-100 truncate">
            {name} {lastName}
          </h2>
          <p className="text-sm text-neutral-400">{specialty}</p>
        </div>
      </div>

      <div className="hidden lg:block pr-4">
        <Link
          to={`/admin/doctors/${id}`}
          className="inline-flex items-center px-4 py-2 bg-neutral-700 text-neutral-100 text-sm font-medium rounded-md hover:bg-neutral-600 transition-colors duration-300"
        >
          Detalles
          <ArrowOutwardIcon className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};