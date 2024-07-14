import { Link } from "react-router-dom";

interface Props {
    handleAside: (aside: boolean) => void;
    aside: boolean;
}
export const GlobalAside = ({ handleAside, aside }: Props) => {
  return (
    <aside className="fixed w-full h-[100svh] bg-white flex justify-center items-center">
          <div className="flex flex-col items-center gap-5 -mt-32">
            <Link to="/">
              <h1 className="font-bold tracking-wide text-2xl text-sky-900">
                <span className="text-sky-500 mr-2">&#10010;</span>Med
                <span className="text-sky-600">Monitor</span>
              </h1>
            </Link>
            <Link to="/login" onClick={() =>handleAside(aside)}>
              <button className="border border-sky-200 text-sky-900 font-bold rounded-full p-3 w-[170px]">
                Iniciar sesión
              </button>
            </Link>
            <Link to="/signin" onClick={() =>handleAside(aside)}>
              <button className="bg-sky-200 text-sky-500 font-bold rounded-full p-3 w-[170px]">
                Registrarse
              </button>
            </Link>
          </div>
        </aside>
  )
}
