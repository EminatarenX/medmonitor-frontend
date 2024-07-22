import { SubTitle } from "../../../components/shared/text/subtitle.component";
import { Title } from "../../../components/shared/text/title.component";
import { ArticleTitle } from "../../../components/shared/text/articletitle.component";
import { FlexColList } from "../../../components/shared/container/flex-col-list.component";
import { PatientInList } from "../../../components/doctor/patients/patientinlist.component";
import { FlexRowSection } from "../../../components/shared/container/flex-row.component";
import { DarkCardContainer } from "../../../components/shared/container/dark-card.component";
import { useEffect, useRef, useState } from "react";
import { usePatientState } from "../../../stores/patient.store";
import { useAuthState } from "../../../stores/auth/auth.store";
import {
  PieChart,
} from "@mui/x-charts";
import { Link } from "react-router-dom";
import {OpenInNewRounded } from "@mui/icons-material";
import { useStatisticsState } from "../../../stores/stadistics/stadistics.store";

export const DoctorDashboard = () => {
  const widthSection = useRef<HTMLDivElement>(null);
  const getPatientsForDoctor = usePatientState(
    (state) => state.getPatientsForDoctor
  );
  const getTotalPatients = useStatisticsState( state => state.getTotalManAndWomanDoctor)
  const totalManAndWoman = useStatisticsState( state => state.totalManAndWoman)
  const totalMessagesDoctor = useStatisticsState( state => state.totalMessagesDoctor)
  const getTotalMessagesSendedDoctor = useStatisticsState( state => state.getTotalMessagesSendedDoctor)
  const doctor = useAuthState((state) => state.doctor);
  const patients = usePatientState((state) => state.patients);
  const doctorName = () => doctor && doctor.name + " " + doctor.lastName;
  const limit = 5;
  const [width, setWidth] = useState(0);

  const updateWidth = () => {
    if (widthSection.current) {
      setWidth(widthSection.current?.clientWidth);
    }
  };

  useEffect(() => {
    updateWidth();

    window.addEventListener("resize", updateWidth);
    const getData = async () => {
      await getPatientsForDoctor(limit);
      await getTotalPatients();
      await getTotalMessagesSendedDoctor();
    };

    getData();

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <section className="p-6 bg-neutral-900 text-white">
    <article className="mb-8">
      <SubTitle color="white" value="Bienvenido" />
      <Title color="white" value={`Dr. ${doctorName()}`} />
    </article>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <article className="col-span-2 bg-neutral-800 rounded-xl p-6 shadow-lg">
        <ArticleTitle color="white" value="Pacientes nuevos" />
        {Object.values(patients).length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-neutral-400">No hay pacientes registrados</p>
          </div>
        ) : (
          <FlexColList>
            {Object.values(patients).map((patient) => (
              <PatientInList key={patient.id} patient={patient} />
            ))}
          </FlexColList>
        )}
      </article>
  
      <DarkCardContainer width="w-full">
        <div className="flex flex-col h-full">
          <img src="/Checkbox.svg" className="w-40 h-40 mx-auto mb-4" alt="Recordatorio" />
          <SubTitle color="white" value="Recuerda" />
          <p className="text-lg mb-4">
            Es importante que revises el estado de tus pacientes. No hay que olvidarnos de ellos.
          </p>
          <Link
            to="/doctor/patients"
            className="mt-auto bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            Ver pacientes <OpenInNewRounded className="ml-2" />
          </Link>
        </div>
      </DarkCardContainer>
    </div>
  
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
  {/* Gráfico de pacientes */}
  <div className="bg-neutral-800 rounded-xl p-6 shadow-lg ">
    <h3 className="text-xl font-semibold text-white mb-4">
      Total pacientes: {totalManAndWoman.man + totalManAndWoman.woman}
    </h3>
    <div className="relative " ref={widthSection}>
      <PieChart
        series={[
          {
            data: [
              { label: 'Hombres', value: totalManAndWoman.man, color: '#3B82F6' },
              { label: 'Mujeres', value: totalManAndWoman.woman, color: '#EC4899' },
            ],
            innerRadius: 60,
            outerRadius: 80,
            paddingAngle: 2,
            cornerRadius: 4,
          },
        ]}
        width={width + 90}
        height={200}
        legend={{ hidden: true }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-3xl font-bold text-white">
            {totalManAndWoman.man + totalManAndWoman.woman}
          </p>
          <p className="text-sm text-neutral-400">Total</p>
        </div>
      </div>
    </div>
    <div className="flex justify-center mt-4 space-x-4">
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full bg-[#3B82F6] mr-2"></div>
        <span className="text-sm text-neutral-300">Hombres: {totalManAndWoman.man}</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full bg-[#EC4899] mr-2"></div>
        <span className="text-sm text-neutral-300">Mujeres: {totalManAndWoman.woman}</span>
      </div>
    </div>
  </div>

  {/* Mensajes enviados y estadísticas adicionales */}
  <div className="col-span-3 bg-neutral-800 rounded-xl p-6 shadow-lg">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Mensajes enviados */}
      <div className="bg-neutral-700 rounded-lg p-4 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-white mb-2">Mensajes enviados</h3>
        {totalMessagesDoctor === 0 ? (
          <p className="text-xl text-neutral-400">No hay mensajes enviados</p>
        ) : (
          <p className="text-4xl font-bold text-white">{totalMessagesDoctor}</p>
        )}
      </div>

      {/* Estadística adicional 1 */}
      <div className="bg-neutral-700 rounded-lg p-4 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-white mb-2">Frecuencia en la plataforma</h3>
        <p className="text-4xl font-bold text-white">6 días</p>
      </div>

      {/* Estadística adicional 2 */}
      <div className="bg-neutral-700 rounded-lg p-4 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-white mb-2">Pacientes monitoreados</h3>
        <p className="text-4xl font-bold text-white">1</p>
      </div>
    </div>

    {/* Área para gráfico o información adicional */}
    <div className="mt-6 bg-neutral-700 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Actividad reciente</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-neutral-300">Nuevos pacientes</span>
          <span className="text-white font-semibold">+3</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-300">Chats activos</span>
          <span className="text-white font-semibold">1</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-300">Mensajes sin leer</span>
          <span className="text-white font-semibold">0</span>
        </div>
      </div>
    </div>
  </div>
</div>
  </section>
  );
};
