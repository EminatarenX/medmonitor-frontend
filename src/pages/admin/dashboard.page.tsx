import { HeaderAdminDashboard } from "../../components/admin/main/header.component";
import { SmallSquareContainer } from "../../components/admin/main/smallSquare.component";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import { LineChart } from "@mui/x-charts";
import { useEffect, useRef } from "react";
import { useDoctorState } from "../../stores/auth/admin/doctor.store";
import { usePatientState } from "../../stores/patient.store";

export const DashboardPage = () => {
  const widthSection = useRef<HTMLDivElement>(null);
  const getDoctors = useDoctorState((state) => state.getDoctors);
  const totalDoctors = useDoctorState((state) => state.totalDoctors);
  const getTotalPatients = usePatientState( state => state.getPatientsHospital)
  const totalPatients = usePatientState( state => state.totalPatients)
  useEffect(() => {
    const getData = async () => {
      await getDoctors();
      await getTotalPatients()
    };
    getData();
  }, []);

  return (
<div className="bg-neutral-900 min-h-screen text-neutral-100 p-6">
  <header className="mb-8">
    <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
    <p className="text-neutral-400">Bienvenido al panel de control del hospital</p>
  </header>

  <main>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Tarjeta de Doctores */}
      <div className="bg-neutral-800 rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-neutral-400">Total de Doctores</p>
            <h2 className="text-3xl font-bold mt-1">{totalDoctors}</h2>
          </div>
          <div className="bg-blue-500 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <p className="text-sm text-neutral-400 mt-4">Doctores registrados en el sistema</p>
      </div>

      {/* Tarjeta de Pacientes */}
      <div className="bg-neutral-800 rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-neutral-400">Total de Pacientes</p>
            <h2 className="text-3xl font-bold mt-1">{totalPatients}</h2>
          </div>
          <div className="bg-green-500 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <p className="text-sm text-neutral-400 mt-4">Pacientes atendidos hasta la fecha</p>
      </div>

      {/* Tarjeta de Citas */}
      <div className="bg-neutral-800 rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-neutral-400">Citas Programadas</p>
            <h2 className="text-3xl font-bold mt-1">10</h2>
          </div>
          <div className="bg-purple-500 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <p className="text-sm text-neutral-400 mt-4">Número total de citas programadas</p>
      </div>

      {/* Tarjeta Adicional */}
      <div className="bg-neutral-800 rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-neutral-400">Ocupación Hospitalaria</p>
            <h2 className="text-3xl font-bold mt-1">75%</h2>
          </div>
          <div className="bg-yellow-500 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
        <p className="text-sm text-neutral-400 mt-4">Porcentaje de camas ocupadas</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
  {/* Bienvenida y Resumen */}
  <div className="lg:col-span-2 bg-neutral-800 p-6 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold mb-4">Bienvenido, Administrador</h2>
    <p className="text-gray-300 mb-4">Aquí tienes un resumen de la situación actual del hospital:</p>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="bg-neutral-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Pacientes Actuales</h3>
        <p className="text-3xl font-bold">{totalPatients}</p>
      </div>
      <div className="bg-neutral-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Personal en Turno</h3>
        <p className="text-3xl font-bold">{totalDoctors}</p>
      </div>
    </div>
    <div className="bg-neutral-700 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Ocupación de Urgencias</h3>
      <div className="w-full bg-neutral-600 rounded-full h-4 mb-2">
        <div className="bg-green-500 h-4 rounded-full" style={{width: '70%'}}></div>
      </div>
      <p className="text-sm text-gray-300">70% de capacidad</p>
    </div>
  </div>

  {/* Recomendaciones */}
  <div className="bg-neutral-800 p-6 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold mb-4">Recomendaciones</h2>
    <ul className="space-y-3">
      <li className="flex items-start">
        <svg className="h-6 w-6 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>Revisar el inventario de suministros médicos</span>
      </li>
      <li className="flex items-start">
        <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Programar la próxima reunión de personal</span>
      </li>
      <li className="flex items-start">
        <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Actualizar los protocolos de seguridad</span>
      </li>
    </ul>
  </div>

  {/* Estadísticas Adicionales */}
  <div className="bg-neutral-800 p-6 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold mb-4">Estadísticas del Mes</h2>
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Tasa de Ocupación</h3>
        <p className="text-3xl font-bold">85%</p>
        <p className="text-sm text-gray-400">5% más que el mes anterior</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Tiempo Promedio de Espera</h3>
        <p className="text-3xl font-bold">28 min</p>
        <p className="text-sm text-gray-400">2 min menos que el mes anterior</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Satisfacción del Paciente</h3>
        <p className="text-3xl font-bold">4.7/5</p>
        <p className="text-sm text-gray-400">Basado en 500 encuestas</p>
      </div>
    </div>
  </div>

  {/* Actividad Reciente */}
  <div className="lg:col-span-3 bg-neutral-800 p-6 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold mb-4">Actividad Reciente</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400 border-b border-neutral-700">
            <th className="pb-3 pr-4">Evento</th>
            <th className="pb-3 pr-4">Departamento</th>
            <th className="pb-3 pr-4">Hora</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-neutral-700">
            <td className="py-3 pr-4">Ingreso de paciente</td>
            <td className="py-3 pr-4">Urgencias</td>
            <td className="py-3 pr-4">Hace 10 minutos</td>
          </tr>
          <tr className="border-b border-neutral-700">
            <td className="py-3 pr-4">Cirugía completada</td>
            <td className="py-3 pr-4">Quirófano 2</td>
            <td className="py-3 pr-4">Hace 45 minutos</td>
          </tr>
          <tr>
            <td className="py-3 pr-4">Actualización de inventario</td>
            <td className="py-3 pr-4">Farmacia</td>
            <td className="py-3 pr-4">Hace 2 horas</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
  </main>
</div>
  );
};
