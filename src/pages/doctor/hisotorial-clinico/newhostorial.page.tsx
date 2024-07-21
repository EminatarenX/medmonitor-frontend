import React, { useEffect } from "react";
import { HistorialClinicoForm } from "../../../components/doctor/patients/medic-history.form.component";
import { Title } from "../../../components/shared/text/title.component";
import { usePatientState } from "../../../stores/patient.store";
import { useParams } from "react-router-dom";
import { SubTitle } from "../../../components/shared/text/subtitle.component";
import { DarkCardContainer } from "../../../components/shared/container/dark-card.component";

export default function NewHistorialClinicoPage() {
  const params = useParams();
  const patient = usePatientState((state) => state.currentPatient);
  const findPatient = usePatientState((state) => state.getPatient);
  useEffect(() => {
    const init = async () => {
      if (params.id) await findPatient(params?.id);
    };
    init();
  }, []);
  return (
    <section className="m-5">
      <header className="mb-8">
        <Title value="Nuevo Registro Clinico" color="white"/>
      </header>
      <DarkCardContainer width="full">
        <HistorialClinicoForm patientId={params?.id} />
      </DarkCardContainer>
      <footer className="mt-8 text-center text-neutral-400">
        <p>© 2024 Medmonitor. Todos los derechos reservados.</p>
      </footer>
    </section>
  );
}
