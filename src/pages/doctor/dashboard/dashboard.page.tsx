import { SubTitle } from "../../../components/shared/text/subtitle.component";
import { Title } from "../../../components/shared/text/title.component";
import { ArticleTitle } from "../../../components/shared/text/articletitle.component";
import { FlexColList } from "../../../components/shared/container/flex-col-list.component";
import { PatientInList } from "../../../components/doctor/patients/patientinlist.component";
import { FlexRowSection } from "../../../components/shared/container/flex-row.component";
import { DarkCardContainer } from "../../../components/shared/container/dark-card.component";
import { useEffect, useRef } from "react";
import { DobleLineChart } from "../../../components/shared/charts/line-chart";
import { usePatientState } from "../../../stores/patient.store";
import { useAuthState } from "../../../stores/auth/auth.store";

export const DoctorDashboard = () => {
  const widthSection = useRef<HTMLDivElement>(null);
  const getPatientsForDoctor = usePatientState(
    (state) => state.getPatientsForDoctor
  ); 
  const doctor = useAuthState((state) => state.doctor);
  const patients = usePatientState((state) => state.patients);
  const doctorName = () => doctor && doctor.name + " " + doctor.lastName;
  const limit = 5;

  useEffect(() => {
    const getData = async () => {
      await getPatientsForDoctor(limit);
    };
    
    getData();
  },[]);


  return (
    <section className="m-5">
      <article className="">
        <SubTitle value="Bienvenido" color="white" />
        <Title value={`Dr. ${doctorName()} `} color="white" />
      </article>
      <FlexRowSection>
        <article className="flex gap-2 flex-col shadow-xl  bg-neutral-900 border-neutral-700 p-2 lg:p-5 rounded-2xl mt-5 lg:w-1/3 appear-up">
          <ArticleTitle value="Pacientes nuevos" color="white" />
          <FlexColList>
            {Object.values(patients).length === 0 ? (
              <section className="flex justify-center items-center h-96">
                <h1 className="text-2xl font-semibold text-neutral-500">
                  No hay pacientes registrados
                </h1>
              </section>
            ) : (
              Object.values(patients).map((patient) => (
                <PatientInList key={patient.id} patient={patient} />
              ))
            )}
          </FlexColList>
        </article>
        <DarkCardContainer width="w-2/3">
          <ArticleTitle
            value="Consultas en los últimos 30 dias"
            color="white"
          />

          <section ref={widthSection}>
            <DobleLineChart
              firstData={[7, 4, 8, 23, 22]}
              secondData={[5, 10, 15, 20, 25]}
              labels={["Mayo", "Junio", "Julio", "Agosto", "Septiembre"]}
              width={widthSection.current?.clientWidth!}
              height={500}
              firstLabel="Consultas"
              secondLabel="Pacientes"
            />
          </section>
        </DarkCardContainer>
      </FlexRowSection>
      <section className="flex"></section>
    </section>
  );
};
