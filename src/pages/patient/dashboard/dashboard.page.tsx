import { useEffect } from "react";
import MonitoredPatientCard from "../../../components/shared/app/monitored-patient-card.component";
import { DarkCardContainer } from "../../../components/shared/container/dark-card.component";
import { Title } from "../../../components/shared/text/title.component";
import { useAuthState } from "../../../stores/auth/auth.store";
import { useMonitorState } from "../../../stores/monitor/monitor.store";
import { useClinicalRegistryState } from "../../../stores/medical-registry/clinical-registr.store";
import { ClinicalRegistryComponent } from "../../../components/shared/app/clinicalregistry";
import { useStatisticsState } from "../../../stores/stadistics/stadistics.store";
import AnomalyProbabilityCard from "../../../components/shared/app/anomally-cardpatient.component";

export const PatientDashboardPage = () => {
  const patient = useAuthState((state) => state.patient);
  const patientName = () => patient && patient.name + " " + patient.lastName;
  const getMonitor = useMonitorState( state => state.findMonitor)
  const currentMonitor = useMonitorState( state => state.currentMonitor)
  const clinicalRegistries = useClinicalRegistryState(state => state.registries)
  const getClinicalRegistries = useClinicalRegistryState( state => state.findAllPatientRegistries)
  const anomalyProbability = useStatisticsState( state => state.anomalyProbabilityPatient)
  const getAnomalyProbability = useStatisticsState( state => state.getAnomalyProbabilityPatient)

  useEffect(() => {
    const interval = setInterval(async () => {
      await getMonitor(patient?.id!)
      await getClinicalRegistries(patient?.id!)
    }, 2000)
    const init = async () => {
      await getMonitor(patient?.id!);
      await getAnomalyProbability(patient?.id!);
    }

    init();

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <section className="m-5 flex flex-col gap-5">
      <article>
        <Title value="Monitor" color="white" />
      </article>
      <DarkCardContainer width="w-full">
      {
        !currentMonitor ? (
          <div className="flex items-center justify-center pt-10">
            <p className="font-bold text-neutral-600">Aun no hay datos por cargar</p>
          </div>
        ): (
          <MonitoredPatientCard
            monitor={currentMonitor}
            key={currentMonitor.id}
          />
        )
      }
      </DarkCardContainer>
      <DarkCardContainer width="w-full">
        <AnomalyProbabilityCard probability={anomalyProbability} />
      </DarkCardContainer>

      <DarkCardContainer width="w-full">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!clinicalRegistries ? (
            <div className="flex justify-center">
              <span className="text-white">No hay registros por mostrar</span>
            </div>
          ) : (
            Object.values(clinicalRegistries).map((registry) => (
              <ClinicalRegistryComponent clinicalRegistry={registry} />
            ))
          )}
        </section>
      </DarkCardContainer>
    </section>
  );
};
