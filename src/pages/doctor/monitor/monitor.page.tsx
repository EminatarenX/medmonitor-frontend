import { useEffect, useState } from "react";
import { NewAppointmentForm } from "../../../components/doctor/appointments/newappointment-form";
import { PatientInList } from "../../../components/doctor/patients/patientinlist.component";
import MonitoredPatientCard from "../../../components/shared/app/monitored-patient-card.component";
import { DarkCardContainer } from "../../../components/shared/container/dark-card.component";
import { FlexRowSection } from "../../../components/shared/container/flex-row.component";
import { GridContainer } from "../../../components/shared/container/grid-container.component";
import { ArticleTitle } from "../../../components/shared/text/articletitle.component";
import { Title } from "../../../components/shared/text/title.component";

export const DoctorMonitorPage = () => {
  const timelabelsarray = () => {
    let labels = [];
    for (let i = 0; i < 10; i++) {
      labels.push(i.toString());
    }
    return labels;
  }
 const [patient, setPatient] = useState({
    id: 1,
    name: "Paciente 1",
    heartRate: 80,
    oxygenSaturation: 90,
    timeLabels: [...timelabelsarray() ],
    heartRateData: [5, 5, 7, 8, 9, 10, 11, 12, 13, 14],
    oxygenData: [6, 5, 8, 9, 11, 12, 13, 14, 15, 16],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPatient((prevPatient) => {
        const newHeartRateData = [...prevPatient.heartRateData.slice(1), Math.floor(Math.random() * 5)];
        const newOxygenData = [...prevPatient.oxygenData.slice(1), Math.floor(Math.random() * 7)];
        const newTimeLabels = prevPatient.timeLabels.length >= 10 
          ? [...prevPatient.timeLabels.slice(1), (parseInt(prevPatient.timeLabels[prevPatient.timeLabels.length - 1]) + 1).toString()]
          : [...prevPatient.timeLabels, (prevPatient.timeLabels.length + 1).toString()];

        return {
          ...prevPatient,
          heartRate: Math.floor(Math.random() * 100),
          oxygenSaturation: Math.floor(Math.random() * 100),
          heartRateData: newHeartRateData,
          oxygenData: newOxygenData,
          timeLabels: newTimeLabels,
        };
      });
    }, 1500);
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
          <NewAppointmentForm />
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

          <MonitoredPatientCard patient={patient}/>
          <MonitoredPatientCard patient={patient}/>
          <MonitoredPatientCard patient={patient}/>
        </GridContainer>
        {/* </FlexColList> */}
      </DarkCardContainer>
    </section>
  );
};

const patient = {
  id: 1,
  name: "Paciente 1",
  heartRate: 80,
  oxygenSaturation: 90,
  timeLabels: ["1", "2", "3", "4", "5"],
  heartRateData: [5, 5, 7, 8, 9],
  oxygenData: [6, 5, 8, 9, 11],
}
