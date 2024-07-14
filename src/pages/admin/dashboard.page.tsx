import { HeaderAdminDashboard } from "../../components/admin/main/header.component";
import { SmallSquareContainer } from "../../components/admin/main/smallSquare.component";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import { LineChart } from "@mui/x-charts";
import { useEffect, useRef } from "react";
import { useDoctorState } from "../../stores/auth/admin/doctor.store";

export const DashboardPage = () => {
  const widthSection = useRef<HTMLDivElement>(null);
  const getDoctors = useDoctorState((state) => state.getDoctors);
  const totalDoctors = useDoctorState((state) => state.totalDoctors);

  useEffect(() => {
    const getData = async () => {
      await getDoctors();
    };
    getData();
  }, []);

  return (
    <div className="bg-neutral-900 min-h-screen text-neutral-100">
      <HeaderAdminDashboard />
      <main className="mt-6">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SmallSquareContainer
            data={totalDoctors.toString()}
            title="Total de Doctores"
            paragraph="Doctores registrados en el sistema"
          >
            <AdminPanelSettingsOutlinedIcon className="h-12 w-12 text-neutral-300" />
          </SmallSquareContainer>
          <SmallSquareContainer
            data={"10"}
            title="Total de Pacientes"
            paragraph="Pacientes atendidos hasta la fecha"
            bgColor="bg-neutral-700"
          >
            <Diversity1OutlinedIcon className="h-12 w-12 text-neutral-300" />
          </SmallSquareContainer>
          <SmallSquareContainer
            data={"10"}
            title="Citas hechas"
            paragraph="Número total de citas programadas"
          >
            <BookmarkAddedOutlinedIcon className="h-12 w-12 text-neutral-300" />
          </SmallSquareContainer>
          <SmallSquareContainer
            data={"10"}
            title="Algo más"
            paragraph="Información adicional relevante"
            bgColor="bg-neutral-700"
          >
            <BookmarkAddedOutlinedIcon className="h-12 w-12 text-neutral-300" />
          </SmallSquareContainer>
        </section>
        <section
          ref={widthSection}
          className="bg-neutral-800 p-6 rounded-lg shadow-md"
        >
          <LineChart
            colors={["#6ee7b7"]} // Un color más claro para contrastar con el fondo oscuro
            xAxis={[{ data: [1, 2, 3, 5, 8, 10], stroke: "#9ca3af" }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={widthSection.current?.clientWidth || 400}
            height={400}
            sx={{
              ".MuiChartsAxis-tickLabel": { fill: "#9ca3af" },
              ".MuiChartsAxis-line": { stroke: "#4b5563" },
              ".MuiChartsAxis-tick": { stroke: "#4b5563" },
            }}
          />
        </section>
      </main>
    </div>
  );
};
