import { Link } from "react-router-dom";
import { SquaresIcon } from "../../icons/Squares.icon";
// import { DashboardIcon } from "../icons/dashboard.icon";
import { UserIcon } from "../../icons/user.icon";
import { BadgeIcon } from "../../icons/BadgeIcon.icons";
import { CalendarIcon } from "../../icons/calendar.icon";
import { LeaveIcon } from "../../icons/leave.icon";

export const AsideAdminDesktop = () => {
  return (
    
    <aside className="h-screen hidden lg:w-1/6 bg-sky-900 lg:flex items-center flex-col py-10">
      <h1 className="font-bold tracking-wide text-2xl text-sky-100">
        <span className="text-sky-400 mr-2">&#10010;</span>Med
        <span className="text-sky-100 font-light">Monitor</span>
      </h1>
     <div className="mt-20 flex flex-col gap-10">
     <Link to={"/admin"} className="text-sky-100 font-bold  flex items-center tracking-wider text-xl ">
        <span className="mr-3"><SquaresIcon /></span><span className="">Inicio</span> 
      </Link>
        <Link to={"/admin/patients"} className="text-sky-100 font-bold  flex items-center tracking-wider text-xl ">
            <span className="mr-3"><UserIcon/></span><span className="">Pacientes</span>
        </Link>
        <Link to={"/admin/doctors"} className="text-sky-100 font-bold  flex items-center tracking-wider text-xl ">
            <span className="mr-3 -mt-2 "><BadgeIcon/></span><span className="">Doctores</span>
        </Link>
        <Link to={'/admin/appointments'} className="text-sky-100 font-bold  flex items-center tracking-wider text-xl "> 
            <span className="mr-3"><CalendarIcon/></span><span className="">Citas</span>
        </Link>
        <button  className="text-sky-100 font-bold  flex items-center tracking-wider text-xl "> 
            <span className="mr-3"><LeaveIcon/></span><span className="">Cerrar sesión</span>
        </button>
     </div>
    </aside>
  );
};
