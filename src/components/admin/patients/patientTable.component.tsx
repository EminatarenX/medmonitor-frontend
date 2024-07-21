import { Link } from "react-router-dom";
import { AccountIcon } from "../../../shared/icons/account.icon";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { Patient } from "../../../interfaces/patient.interface";
import { useHelpers } from "../../../hooks/helpers/useHelpers";


interface Props {
  patient: Patient;
}

export const PatientInTable = ({ patient }: Props) => {
  const {
    id,
    name,
    lastName,
    email,
    phone,
    birthDate,
    password,
    doctor,
    role,
    gender,
    active,
    address,
    doctorId,
    hospitalId,
    createdAt,
  } = patient;
  const { formatDate} = useHelpers();
  return (
    <tr className="border-b border-neutral-700 hover:bg-neutral-800 transition-all duration-200">
      <td className="p-4 flex items-center gap-3">
        <div className="bg-neutral-700 p-2 rounded-full">
          <AccountIcon gender={gender} className="w-5 h-5 text-neutral-300" />
        </div>
        <span className="text-neutral-100 font-medium">{name}</span>
      </td>
      <td className="p-4 text-neutral-300">{lastName}</td>
      <td className="p-4 text-neutral-300">{`${doctor?.name} ${doctor?.lastName}`}</td>
      <td className="p-4 text-neutral-300">{phone}</td>
      <td className="p-4 text-neutral-300">{email}</td>
      <td className="p-4 text-neutral-300">{formatDate(createdAt?.toString()!)}</td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <Link
            to={`/admin/patients/${id}`}
            className="p-2 bg-neutral-700 rounded-full hover:bg-neutral-600 transition-colors duration-200"
          >
            <OpenInNewOutlinedIcon className="w-4 h-4 text-neutral-300" />
          </Link>
          {/* <button className="p-2 bg-neutral-700 rounded-full hover:bg-red-600 transition-colors duration-200">
            <DeleteOutlineOutlinedIcon className="w-4 h-4 text-neutral-300" />
          </button> */}
        </div>
      </td>
    </tr>
  );
};
