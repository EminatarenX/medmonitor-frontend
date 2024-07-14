import { Alert } from "@mui/material"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom"
import { useAuthState } from "../../stores/auth/auth.store"
import { Alerts } from "../../services/alerts/toastify"
import { AxiosError } from "axios"
import { useEffect } from "react"

interface PatientLoginForm {
  id: string
}

export const PatientLogin = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const loginPatient = useAuthState((state) => state.loginPatient)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PatientLoginForm>()

  const onSubmit = async (data: PatientLoginForm) => {
    try {
      await loginPatient(data.id)
      Alerts.toastify("Bienvenido de nuevo! 👋", "success");
      navigate('/patient/dashboard')
    } catch (e) {
      const error = e as AxiosError<any>;
      Alerts.toastify(
        error?.response?.data?.message || "Error desconocido",
        "error"
      );
    }
  }

  useEffect(() => {
    setValue("id", id || '');
  },[])

  return (
    <section className="flex items-center h-screen">
    <article className="lg:w-1/2 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mx-5 lg:mx-20 gap-5  max-w-[800px]"
      >
        <h1 className="text-6xl text-sky-950 font-bold">Iniciar sesión</h1>
        {errors.id && (
          <Alert severity="error">Por favor ingresa tu ID de paciente</Alert>
        )}
        <input
          type="text"
          placeholder="ID de paciente"
          className="rounded border p-2 placeholder:text-neutral-500 text-sky-950"
          {...register("id", { required: true })}
        />
        
        <input
          type="submit"
          value="Entrar"
          className="p-3 rounded font-semibold text-white bg-sky-800"

        />
        <Link to="/" className="text-center text-sky-800">
          Volver al inicio
        </Link>

      </form>
    </article>
    <article className="hidden w-1/2 h-screen lg:flex items-center justify-center bg-sky-900">
      <img
        src="/patient.svg"
        alt="imagen-login"
        className="object-contain max-h-[700px] appear-up"
      />
    </article>
  </section>
  )
}
