import { Alert } from "@mui/material"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useAuthState } from "../../stores/auth/auth.store"
import { Alerts } from "../../services/alerts/toastify"
import { AxiosError } from "axios"

interface DoctorLoginForm {
  email: string
  password: string
}

export const DoctorLogin = () => {
  const navigate = useNavigate()
  const loginDoctor = useAuthState((state) => state.loginDoctor)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorLoginForm>()

  const onSubmit = async (data: DoctorLoginForm) => {
    try {
      await loginDoctor(data.email, data.password);
      Alerts.toastify("Bienvenido de nuevo! 👋", "success");
      navigate('/doctor/dashboard')
    } catch (e) {
      console.log(e)
      const error = e as AxiosError<any>;
      Alerts.toastify(
        error?.response?.data?.message || "Error desconocido",
        "error"
      );
    }
  }

  return (
    <section className="flex items-center h-screen">
    <article className="lg:w-1/2 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mx-5 lg:mx-20 gap-5  max-w-[800px]"
      >
        <h1 className="text-6xl text-sky-950 font-bold">Iniciar sesión</h1>
        {errors.email && (
          <Alert severity="error">El correo electrónico es requerido</Alert>
        )}
        {errors.password && (
          <Alert severity="error">La contraseña es requerida</Alert>
        )}
        <input
          type="text"
          placeholder="correo electrónico"
          className="rounded border p-2 placeholder:text-neutral-500 text-sky-950"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="contraseña"
          autoComplete="off"
          className="rounded border p-2 placeholder:text-neutral-500 text-sky-950"
          {...register("password", { required: true })}
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
        src="/man.svg"
        alt="imagen-login"
        className="object-contain max-h-[700px] appear-up"
      />
    </article>
  </section>
  )
}
