import MonitoredPatientCard from "../../../components/shared/app/monitored-patient-card.component";
import { Title } from "../../../components/shared/text/title.component";
import { useAuthState } from "../../../stores/auth/auth.store";

export const PatientDashboardPage = () => {
  const patient = useAuthState((state) => state.patient);
  const patientName = () => patient && patient.name + " " + patient.lastName;

  return (
    <section className="m-5">
      <article>
        <Title value="Monitor" color="white" />
      </article>
      {/* <DarkCardContainer width="w-full"> */}
      <MonitoredPatientCard
        patient={{
          id: patient?.id || "",
          name: patientName() || "",
          heartRate: 80,
          oxygenSaturation: 98,
          timeLabels: ["Mayo", "Junio", "Julio", "Agosto", "Septiembre"],
          heartRateData: [7, 4, 8, 23, 22],
          oxygenData: [5, 10, 15, 20, 25],
        }}
      />
      {/* </DarkCardContainer> */}
    </section>
  );
};
