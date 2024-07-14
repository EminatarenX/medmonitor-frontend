import { Link } from "react-router-dom"
import { BadgeIcon } from "../../icons/BadgeIcon.icons"
import { SquaresIcon } from "../../icons/Squares.icon"
import { CalendarIcon } from "../../icons/calendar.icon"
import { UserIcon } from "../../icons/user.icon"
import { useState } from "react"
import { ArrowRightIcon } from "../../icons/arrowright.icon"
import { CloseIcon } from "../../icons/close.icon"
import { LeaveIcon } from "../../icons/leave.icon"

export const AsideAdminMobile = () => {
    const [aside, setAside] = useState(false)
  return (
    <aside className={`h-screen lg:hidden bg-sky-900 flex ${aside ? 'w-full fixed' : 'w-2/12'} items-center justify-center flex-col py-10 transition-all duration-200 z-10`}>
        {
            aside ? (
                <button onClick={() => setAside(false)} className="text-sky-100 font-bold  flex items-center tracking-wider text-xl mb-8 -mt-32 -ml-20">
                    <span className={`${aside && 'mr-3'}`}><CloseIcon /></span><span className={`${aside ? 'block': 'hidden'}`}>Close</span> 
                </button>
            ) : (
                <button onClick={() => setAside(true)} className="text-sky-100 font-bold  flex items-center tracking-wider text-xl -mt-32 mb-20">
                    <span className=""><ArrowRightIcon /></span>
                </button>
            )
        }
      <h1 className={`font-bold tracking-wide text-2xl text-sky-100 mb-20 ${aside ? 'block': 'hidden'}`} >
        <span className="text-sky-400 mr-2">&#10010;</span>Med
        <span className="text-sky-100 font-light">Monitor</span>
      </h1>
     <div className={` flex flex-col gap-10`}>
     <Link to={"/admin"} onClick={() => setAside(false)}  className="text-sky-100 font-bold  flex items-center tracking-wider text-xl ">
        <span className={`${aside && 'mr-3'}`}><SquaresIcon /></span><span className={`${aside ? 'block': 'hidden'}`}>Inicio</span> 
      </Link>
        <Link to={"/admin/patients"} onClick={() => setAside(false)} className="text-sky-100 font-bold  flex items-center tracking-wider text-xl ">
            <span className={`${aside && 'mr-3'}`}><UserIcon/></span><span className={`${aside ? 'block': 'hidden'}`}>Pacientes</span>
        </Link>
        <Link to={"/admin/doctors"} onClick={() => setAside(false)} className="text-sky-100 font-bold  flex items-center tracking-wider text-xl ">
            <span className={`${aside && 'mr-3'} -mt-1`}><BadgeIcon/></span><span className={`${aside ? 'block': 'hidden'}`}>Doctores</span>
        </Link>
        <Link to={'/admin/appointments'} onClick={() => setAside(false)} className="text-sky-100 font-bold  flex items-center tracking-wider text-xl "> 
            <span className={`${aside && 'mr-3'}`}><CalendarIcon/></span><span className={`${aside ? 'block': 'hidden'}`}>Citas</span>
        </Link>
        <button onClick={() => setAside(false)}  className="text-sky-100 font-bold  flex items-center tracking-wider text-xl "> 
            <span className={`${aside && 'mr-3'}`}><LeaveIcon/></span><span className={`${aside ? 'block': 'hidden'}`}>Cerrar sesión</span>
        </button>
     </div>
    </aside>
  )
}
