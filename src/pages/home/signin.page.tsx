import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert } from "@mui/material";
import { fetchService } from "../../services";
import { Alerts } from "../../services/alerts/toastify"; 
import {  RegisterResponse } from "../../services/fetch/responses/auth/response";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export interface IForm {
  email: string;
  password: string;
  confirm: string;
}
export const Signin = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<IForm>();
  const handleLogin = async (data: IForm) => {
    try {
      await fetchService.post<RegisterResponse>('/auth/register', {...data, confirm: undefined})
      Alerts.toastify('Usuario registrado', 'success')
      navigate('/login')
    } catch (error) {
      const err = error as AxiosError<any>
      const errors = err?.response?.data?.message
      for( const e of errors) {
        Alerts.toastify(e, 'error')
      }
    }
  };
  return (
    <section className="flex items-center h-[80svh]">
      <article className="lg:w-1/2 w-full">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col mx-5 lg:mx-20 gap-5 max-w-[800px]"
        >
          <h1 className="text-6xl text-sky-950 font-bold">Regístrate</h1>
          {errors.email && (
            <Alert severity="error">El correo electrónico es requerido</Alert>
          )}
          {errors.password && (
            <Alert severity="error">La contraseña es requerida</Alert>
          )}
          {errors.confirm && (
            <Alert severity="error">Confirmar contraseña es requerido</Alert>
          )}
          <input
            type="text"
            placeholder="username"
            className="rounded border p-2 placeholder:text-neutral-500 text-sky-950"
            {...register("email", { required: true })}
          />
          <input
            type="password"
            placeholder="password"
            className="rounded border p-2 placeholder:text-neutral-500 text-sky-950"
            {...register("password", { required: true })}
          />
          <input
            type="password"
            placeholder="confirm password"
            className="rounded border p-2 placeholder:text-neutral-500 text-sky-950"
            {...register("confirm", { required: true })}
          />
          <input
            type="submit"
            value="Enviar"
            className="p-3 rounded font-semibold text-white bg-blue-600"
          />
          <p>
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-blue-600">
              Inicia sesión
            </Link>
          </p>
        </form>
      </article>
      <article className="hidden w-1/2 lg:flex items-center justify-center">
        <img
          src="./doctor-virus.svg"
          alt="imagen-register"
          className="object-contain max-h-[600px] appear-up"
        />
      </article>
    </section>
  );
};
