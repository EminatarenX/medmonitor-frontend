import { useEffect, useState } from "react";
import { PatientsHeader } from "../../components/admin/patients/header.component";
import { PatientInTable } from "../../components/admin/patients/patientTable.component";
import { Pagination } from "@mui/material";

export const PatientsPage = () => {
  const [filtro, setFiltro] = useState("Todos");
  const limit = 6;
  const [page, setPage] = useState(1);
  const [array, setArray] = useState<number[]>([]);
  const patients = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const totalPages = Math.ceil(patients.length / limit);

  useEffect(() => {
    const getPatients = () => {
      let start = (page - 1) * limit;
      let end = start + limit;
      const patientsGotten = patients.slice(start, end);
      setArray([...patientsGotten]);
    };
    getPatients();
  }, [page]);

  return (
    <div className="bg-neutral-900 min-h-screen text-neutral-100">
      <PatientsHeader />
      <main className="mt-5">
        <nav className="mb-8">
          <h2 className="text-neutral-100 text-xl font-semibold mb-2">{filtro}</h2>
          <select
            onChange={(e) => setFiltro(e.target.value)}
            className="outline-none p-2 rounded bg-neutral-800 border border-neutral-700 text-neutral-100 focus:border-neutral-500 transition-colors duration-300"
          >
            <option value="Todos">Todos los pacientes</option>
            <option value="Recientes">Recientes</option>
            <option value="Antiguos">Más antiguos</option>
          </select>
        </nav>
        <div className="overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead>
                <tr className="bg-neutral-700">
                  <th className="text-neutral-100 text-start p-3">Nombre del paciente</th>
                  <th className="text-neutral-100 text-start p-3">Departamento</th>
                  <th className="text-neutral-100 text-start p-3">Doctor</th>
                  <th className="text-neutral-100 text-start p-3">Teléfono</th>
                  <th className="text-neutral-100 text-start p-3">Email</th>
                  <th className="text-neutral-100 text-start p-3">Fecha de entrada</th>
                  <th className="text-neutral-100 text-start p-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                {array.map((id, index) => (
                  <PatientInTable
                    key={index}
                    id={id}
                    name={id.toString()}
                    area="Cardiología"
                    doctor="Dr. Emiliano Nataren"
                    phone="1234567890"
                    email="emi@correo.com"
                    date="12/12/2021"
                    gender={index % 2 === 0 ? "male" : "female"}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Pagination
            count={totalPages}
            page={page}
            shape="rounded"
            onChange={(_, value) => setPage(value)}
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#d1d5db',
                '&:hover': {
                  backgroundColor: '#4b5563',
                },
                '&.Mui-selected': {
                  backgroundColor: '#6b7280',
                },
              },
            }}
          />
        </div>
      </main>
    </div>
  );
};