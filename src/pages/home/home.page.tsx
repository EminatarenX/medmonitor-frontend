import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { Fragment } from "react";

export const HomePage = () => {
  return (
    <Fragment>
      <section className="flex flex-col mt-10">
        <Container sx={{display: 'flex', flexDirection: {xs: 'column', md:'row'}}}>
        <article className="flex flex-col items-center lg:items-start justify-center">
          <Container sx={{marginTop: {xs: 5, lg: 0}}}>
            <h1 className="text-5xl lg:text-6xl font-semibold tracking-wide text-sky-950">
              Med<span className="text-sky-500">Monitor</span>
            </h1>
            <p className="lg:max-w-[800px] font-neutral-900">
              Cuida tu salud, monitorea tus signos vitales y lleva un control de
              tu historial médico.
            </p>
          </Container>
         
        </article>

        <article className="flex items-center">
          <img
            src="./doctor-computer.svg"
            alt="home-image.png"
            className="object-contain max-h-[600px] "
          />
        </article>
        </Container>
        <Container sx={{display: 'flex', gap: 2, marginTop:2, flexDirection: {
            xs: 'column',
            sm: 'row',

          }}}>
            <Container className=" rounded-xl shadow-lg">
              <h2 className="text-xl text-sky-900 font-bold">Control Total</h2>
              <p className="text-sky-900">
                Lleva el registro de tu hospital al siguiente nivel con datos
                precisos y análisis detallados.
              </p>
            </Container>
            <Container className=" rounded-xl shadow-lg">
              <h2 className="text-xl text-sky-900 font-bold">Mantente Alerta</h2>
              <p className="text-sky-900">
                Monitorea tus signos vitales en tiempo real y recibe alertas
                instantáneas ante cualquier anomalía.
              </p>
            </Container>
            <Container className=" rounded-xl shadow-lg">
              <h2 className="text-xl text-sky-900 font-bold">Acceso Seguro</h2>
              <p className="text-sky-900">
                Tu información está cifrada y protegida, asegurando que solo tú
                tengas acceso a tus datos de salud.
              </p>
            </Container>
          </Container>
      </section>

      <section className="flex flex-col-reverse lg:flex-row ">
          <Container sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'}, marginTop: 10}}>
          <article className="flex items-center">
          <img
            src="./doctor-walking.svg"
            alt="home-image.png"
            className="object-contain max-h-[600px] hidden lg:block"
          />
        </article>
        <article className="flex flex-col gap-5 items-center justify-center">
          <h1 className="text-center text-6xl font-semibold tracking-wide text-sky-950">
            Eres <span className="text-sky-500">Medico</span> dentro de una institución?{" "}
          </h1>
          <Link to={'/doctor-login'} className="bg-sky-500 text-center font-neutral-900 text-white font-semibold p-3 rounded-xl w-full">
            {/* Keep in touch with your doctor, schedule appointments, and receive notifications. */}
            Inicia sesión ahora
          </Link>
        </article>
          </Container>
      </section>

      <section className="flex lg:flex-row my-20">
      <Container sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'}, marginTop: 10}}>
        <article className="flex flex-col gap-5 items-center justify-center">
          <h1 className="text-center text-6xl font-semibold tracking-wide text-sky-950">
            Eres <span className="text-sky-500">Paciente</span> asistido por un medico?{" "}
          </h1>
          <Link to={'/patient-login/tu-id-de-paciente'} className="bg-sky-500 text-center font-neutral-900 text-white font-semibold p-3 rounded-xl w-full">
            {/* Keep in touch with your doctor, schedule appointments, and receive notifications. */}
            Inicia sesión ahora
          </Link>
        </article>

          </Container>
      </section>
    </Fragment>
  );
};
