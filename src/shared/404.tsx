import { useNavigate } from "react-router-dom"

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col gap-2 items-center justify-center h-[80vh]">
        <h1 className="text-4xl text-sky-950 font-bold">404 - Página no encontrada</h1>
        <button onClick={() => navigate(-1)} className="text-blue-600">Volver </button>
    </section>
  )
}
