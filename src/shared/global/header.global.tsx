import { Link } from "react-router-dom";
import { GlobalAside } from "./aside.global";
import { useLocation } from "react-router-dom";

interface Props {
  handleAside: (aside: boolean) => void;
  aside: boolean;
}

export const GlobalHeader = ({ handleAside, aside }: Props) => {
  const location = useLocation();

  const isPatientLogin = location.pathname.startsWith('/patient-login/');
  const className = isPatientLogin ? 'hidden' : '';
  return (
    <>
    {
      aside && <GlobalAside handleAside={handleAside} aside={aside}/>
    }
    
    <header className={`flex fixed top-0 w-full lg:relative justify-between border-b items-center p-3 bg-white ${location.pathname === '/doctor-login'  && 'hidden'} ${className}`}>
      <Link to="/">
        <h1 className="font-bold tracking-wide text-2xl text-sky-900">
        <span className="text-sky-500 mr-2">&#10010;</span>Med<span className="text-sky-600">Monitor</span>
        </h1>
      </Link>
      <div className="flex gap-10 relative">
        <button
          className="lg:hidden text-2xl block mr-2"
          onClick={() => handleAside(aside)}
        >
          &#9776;
        </button>
        <Link to="/login" className="hidden lg:block ">
          <button className="border border-sky-200 text-sky-900 font-bold rounded-full p-3 w-[170px]">
            Iniciar sesión
          </button>
        </Link>
        <Link to="/signin" className="hidden lg:block ">
          <button className="bg-sky-200 text-sky-500 font-bold rounded-full p-3 w-[170px]">
            Registrarse
          </button>
        </Link>
      </div>
    </header>
    </>
  );
};
