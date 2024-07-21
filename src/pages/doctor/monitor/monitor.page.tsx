import { useEffect, useState } from "react";
import {  NewMonitorForm } from "../../../components/doctor/appointments/newappointment-form";
import { PatientInList } from "../../../components/doctor/patients/patientinlist.component";
import MonitoredPatientCard from "../../../components/shared/app/monitored-patient-card.component";
import { DarkCardContainer } from "../../../components/shared/container/dark-card.component";
import { FlexRowSection } from "../../../components/shared/container/flex-row.component";
import { GridContainer } from "../../../components/shared/container/grid-container.component";
import { ArticleTitle } from "../../../components/shared/text/articletitle.component";
import { Title } from "../../../components/shared/text/title.component";
import { usePatientState } from "../../../stores/patient.store";
import { useMonitorState } from "../../../stores/monitor/monitor.store";


export const DoctorMonitorPage = () => {
  const patients = usePatientState(state => state.patients)
  const getPatients = usePatientState(state => state.getPatientsForDoctor)
  const monitors = useMonitorState( state => state.monitors)
  const getMonitors = useMonitorState( state => state.getMonitors)
  const loading = useMonitorState( state => state.loading)
  

  useEffect(() => {
    const interval = setInterval(async () => {
      await getMonitors();
    }, 3000);

    const init = async () => {
      await getPatients();
      await getMonitors();
    }
    init();

    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="m-5">
      <article>
        <Title value="Monitor" color="white" />
      </article>

      <DarkCardContainer width="w-full">
        <FlexRowSection>
          <ArticleTitle color="white" value="Configura un nuevo monitor" />
        </FlexRowSection>
        <FlexRowSection>
          <NewMonitorForm patients={patients}/>
        </FlexRowSection>
      </DarkCardContainer>

      <DarkCardContainer width="w-full">
        <FlexRowSection>
          <div className="flex lg:flex-row flex-col items-center gap-5">
            <ArticleTitle color="white" value="Lista completa" />
          </div>
        </FlexRowSection>
        {/* <FlexColList> */}
        <GridContainer>

          {
            loading ? (
              <div className="text-center p-3">Cargando...</div>
            ) :  Object.values(monitors).map((monitor) => (
              <MonitoredPatientCard monitor={monitor} key={monitor.id}/>
              ))
            
          }
        </GridContainer>
        {/* </FlexColList> */}
      </DarkCardContainer>
    </section>
  );
};
