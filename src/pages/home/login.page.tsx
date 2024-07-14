import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert } from "@mui/material";
import { Alerts } from "../../services/alerts/toastify";
import { AxiosError } from "axios";
import { useAuthState } from "../../stores/auth/auth.store";
import { useNavigate } from "react-router-dom";
interface IForm {
  email: string;
  password: string;
}
export const Login = () => {

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<IForm>();

  const navitate = useNavigate();

  const loginHospital = useAuthState((state) => state.loginHospital);
  const onSubmit = async (data: IForm) => {
    try {
      await loginHospital(data.email, data.password);
      Alerts.toastify("Bienvenido de nuevo! 👋", "success");
      navitate("/admin");
    } catch (e) {
      const error = e as AxiosError<any>;
      Alerts.toastify(
        error?.response?.data?.message || "Error desconocido",
        "error"
      );
    }
  };
  return (
    <section className="flex items-center h-[80svh]">
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
            type="submit"
            value="Entrar"
            className="p-3 rounded font-semibold text-white bg-blue-600"
          />
          <p>
            ¿No tienes cuenta?{" "}
            <Link to="/signin" className="text-blue-600">
              Regístrate
            </Link>
          </p>
        </form>
      </article>
      <article className="hidden w-1/2 lg:flex items-center justify-center">
        <img
          src="./doctor-medkit.svg"
          alt="imagen-login"
          className="object-contain max-h-[700px] appear-up"
        />
      </article>
    </section>
  );
};
