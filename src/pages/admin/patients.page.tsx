import { useEffect, useState } from "react";
import { PatientsHeader } from "../../components/admin/patients/header.component";
import { PatientInTable } from "../../components/admin/patients/patientTable.component";
import { Pagination } from "@mui/material";
import { usePatientState } from "../../stores/patient.store";
import { SearchRounded } from "@mui/icons-material";

export const PatientsPage = () => {

  const limit = 6;
  const [page, setPage] = useState(1);
  const getPatients = usePatientState( state => state.getPatientsHospital)
  const patients = usePatientState( state => state.patients)
  const totalPatients = usePatientState( state => state.totalPatients)
  const loading = usePatientState( state => state.loading)
  const totalPages = Math.ceil(totalPatients / limit);
  const [buscarPaciente, setBuscarPaciente] = useState('')
  const filterPatients = usePatientState( state => state.filterPatients)
  useEffect(() => {
    const init = async () => {
     await getPatients(limit, page);
    }
    init();
  }, [page]);

  const search = () => {
    if(buscarPaciente !== '') {
      filterPatients(buscarPaciente)
    }

  }

  useEffect(() => {
    const resetPatients = async () => {
      if(buscarPaciente === ''){
        await getPatients(limit,page)
      }
    }
    resetPatients()
  },[buscarPaciente])

  return (
    <div className="bg-neutral-900 min-h-screen text-neutral-100">
      <PatientsHeader />
      <main className="mt-5">
        <nav className="mb-8 flex flex-col">
         <div className="flex gap-2">
         <input 
            placeholder="Buscar paciente por apellidos"
            onChange={e => setBuscarPaciente(e.target.value)}
            type="text"  className="outline-none p-2 rounded bg-neutral-800 border border-neutral-700 text-neutral-100 focus:border-neutral-500 transition-colors duration-300 w-1/2" />
            <button
              onClick={search}
              className="p-2 bg-neutral-700 rounded-lg px-5 hover:bg-neutral-600 transition-colors duration-200"
            >
             <SearchRounded />
            </button>
         </div>
        </nav>
        <div className="overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead>
                <tr className="bg-neutral-700">
                  <th className="text-neutral-100 text-start p-3">Nombre</th>
                  <th className="text-neutral-100 text-start p-3">Apellidos</th>
                  <th className="text-neutral-100 text-start p-3">Doctor</th>
                  <th className="text-neutral-100 text-start p-3">Teléfono</th>
                  <th className="text-neutral-100 text-start p-3">Email</th>
                  <th className="text-neutral-100 text-start p-3">Fecha de entrada</th>
                  <th className="text-neutral-100 text-start p-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                {
                  loading ? (
                    <tr>
                      <td colSpan={7} className="text-center p-3">Cargando...</td>
                    </tr>
                  ) : (
                    Object.values(patients).map((patient) => (
                      <PatientInTable key={patient.id} patient={patient} />
                    ))
                  )
                }
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