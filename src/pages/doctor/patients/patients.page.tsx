import { SearchRounded } from "@mui/icons-material";
import { PatientInList } from "../../../components/doctor/patients/patientinlist.component";
import { DarkCardContainer } from "../../../components/shared/container/dark-card.component";
import { FlexColList } from "../../../components/shared/container/flex-col-list.component";
import { FlexRowSection } from "../../../components/shared/container/flex-row.component";
import { ArticleTitle } from "../../../components/shared/text/articletitle.component";
import { Title } from "../../../components/shared/text/title.component";
import { NewPatientForm } from "../../../components/doctor/patients/new-patient-form.component";
import { DobleLineChart } from "../../../components/shared/charts/line-chart";
import { useEffect, useRef, useState } from "react";
import { Pagination } from "@mui/material";
import { usePatientState } from "../../../stores/patient.store";

export const DoctorPatientsPage = () => {
  const charRef = useRef<HTMLDivElement>(null)
  const limit = 5
  const [page, setpage] = useState(1);

  const patients = usePatientState((state) => state.patients);
  const getPatientsForDoctor = usePatientState((state) => state.getPatientsForDoctor);
  const totalPatients = usePatientState((state) => state.totalPatients);
  const totalPages = Math.ceil(totalPatients / limit);



useEffect(() => {
    const getData = async () => {
      await getPatientsForDoctor(limit, page);
    }
    getData()
  }, [page]);

  return (
    <section className="m-5">
      <article>
        <Title value="Pacientes" color="white" />
      </article>

      <FlexRowSection>
        <DarkCardContainer width="w-2/3">
          <ArticleTitle color="white" value="Agrega un nuevo paciente" />
          <NewPatientForm />
        </DarkCardContainer>
        <DarkCardContainer width="w-1/3 " >
          <ArticleTitle color="white" value="Mayor frecuencia" />
          <div ref={charRef}>
          <DobleLineChart 
            labels={["Enero", "Febrero", "Marzo", "Abril", "Mayo"]}
            firstData={[10, 20, 12, 13, 19]}
            secondData={[5, 10, 15, 20, 25]}
            width={charRef.current?.clientWidth!}
            height={300}
            firstLabel="Pulsaciones"
            secondLabel="Oxigeno"
            />
          </div>
        </DarkCardContainer>
      </FlexRowSection>

      <DarkCardContainer width="w-full">
        <FlexRowSection>
          <div className="flex lg:flex-row flex-col items-center gap-5">
            <ArticleTitle color="white" value="Lista completa" />
            <div className="flex border border-neutral-700 px-3 rounded-full p-2">
              <input
                placeholder="Buscar..."
                type="text"
                className="bg-transparent  text-white outline-none text-sm  w-full"
              />
              <SearchRounded sx={{ color: "gray" }} />
            </div>
          </div>
        </FlexRowSection>
        <FlexColList>
         {
          Object.values(patients).length === 0 ? (
            <section className="flex justify-center items-center h-96">
              <h1 className="text-2xl font-semibold text-neutral-500">
                No hay pacientes registrados
              </h1>
            </section>
          ) : Object.values(patients).map((patient) => (
            <PatientInList key={patient.id} patient={patient} />
          ))
          
         }
        </FlexColList>
      </DarkCardContainer>
      <div className="flex justify-center w-full">
        <Pagination
          count={totalPages}
          page={page}
          shape="rounded"
          onChange={(_, value) => setpage(value)}
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
    </section>
  );
};
