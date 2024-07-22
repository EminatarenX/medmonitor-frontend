import { useEffect, useRef, useState } from "react";
import MonitoredPatientCard from "../../../../components/shared/app/monitored-patient-card.component";
import { ChatContainer } from "../../../../components/shared/container/chat-container.component";
import { DarkCardContainer } from "../../../../components/shared/container/dark-card.component";
import { ArticleTitle } from "../../../../components/shared/text/articletitle.component";
import { Title } from "../../../../components/shared/text/title.component";
import { Link, useParams } from "react-router-dom";
import { usePatientChatPage } from "../../../../hooks/doctor/usepatient.chat.page";
import { socket } from "../../../../stores/ws/websocket";
import Peer, { SignalData } from "simple-peer";
import AddIcon from "@mui/icons-material/Add";
import { ClinicalRegistryComponent } from "../../../../components/shared/app/clinicalregistry";

import { useVideoCallState } from "../../../../stores/chat/videocall.store";
import { ModalVideoCall } from "../../../../components/shared/app/modal-video-call.component";
import { useChatState } from "../../../../stores/chat/chat.store";
import { Alerts } from "../../../../services/alerts/toastify";
import { useMonitorState } from "../../../../stores/monitor/monitor.store";
import { SubTitle } from "../../../../components/shared/text/subtitle.component";
import { useClinicalRegistryState } from "../../../../stores/medical-registry/clinical-registr.store";
import AnomalyProbabilityCard from "../../../../components/shared/app/anomally-cardpatient.component";
import { useStatisticsState } from "../../../../stores/stadistics/stadistics.store";


export const DoctorPatientPage = () => {
  const {
    getPatientInformation,
    patientName,
    getPatientChat,
    chat,
    messages,
    doctor,
    loading,
    sendMessage,
    setNewMessage,
  } = usePatientChatPage();
  const { id: patientId } = useParams();
  const anomalyProbability = useStatisticsState( state => state.anomalyProbabilityPatient)
  const getAnomalyProbability = useStatisticsState( state => state.getAnomalyProbabilityPatient)
  const [callEnded, setCallEnded] = useState(false);
  const connectionRef = useRef<Peer.Instance | null>(null);
  const handleSetMyVideo = useVideoCallState((state) => state.handleSetMyVideo);
  const callingUser = useVideoCallState((state) => state.callingUser);
  const receiveCall = useVideoCallState((state) => state.receiveCall);
  const createChat = useChatState((state) => state.createChatDoctor);
  const getMonitor = useMonitorState((state) => state.findMonitor);
  const monitor = useMonitorState((state) => state.currentMonitor);
  const clinicalRegistries = useClinicalRegistryState(
    (state) => state.registries
  );
  const getClinicalRegistries = useClinicalRegistryState(
    (state) => state.findAllPatientRegistries
  );
  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current?.destroy(); // Usa el operador de encadenamiento opcional para evitar errores
  };
  const handleInitializeChat = async () => {
    try {
      await createChat(patientId!);
    } catch (error) {
      Alerts.toastify("Hubo un error, intenta mas tarde", "error");
    }
  };
  useEffect(() => {
    const interval = setInterval(async () => {
      await getMonitor(patientId!);
    }, 3000);
    const getData = async () => {
      await getPatientInformation(patientId!);
      await getPatientChat(patientId!);
      await getMonitor(patientId!);
      await getClinicalRegistries(patientId!);
      await getAnomalyProbability(patientId!);
    };

    getData();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket?.on("message-server", (message) => {
      setNewMessage(message);
    });
  });

  return (
    <section className="m-5">
      <Title value="Consulta" color="white" />
      <DarkCardContainer width="w-full">
        <header>
          <ArticleTitle value={patientName()} color="white" />
        </header>

        <section className="flex flex-col lg:flex-row justify-between">
          <article className="flex gap-2 flex-col shadow-xl bg-neutral-900 border-neutral-700 rounded-2xl mt-5 lg:w-1/3 ">
            <header>
              <h1 className="text-2xl font-semibold text-neutral-500">
                Monitor
              </h1>
            </header>
            {!monitor ? (
              <div className="flex items-center justify-center pt-10">
                <p className="font-bold text-neutral-600">
                  Aun no hay datos por cargar
                </p>
              </div>
            ) : (
              <MonitoredPatientCard monitor={monitor} key={monitor.id} />
            )}
          </article>
          <DarkCardContainer width="w-2/3">
            <ChatContainer
              create={handleInitializeChat}
              sendMessage={sendMessage}
              chat={chat}
              user={doctor?.id!}
              messages={messages}
              loading={loading}
            />
          </DarkCardContainer>
        </section>
      </DarkCardContainer>
      <ModalVideoCall leaveCall={leaveCall} />

          <DarkCardContainer width="full">
            <AnomalyProbabilityCard probability={anomalyProbability} />
          </DarkCardContainer>
      <DarkCardContainer width="full">
        <header className="flex justify-between items-center">
          <SubTitle value="Historial Clinico" color="white" />
          <Link
            to={`/doctor/patients/history/new/${patientId}`}
            className="flex justify-between items-center gap-5 bg-sky-600  pl-5 rounded-lg "
          >
            <span className="text-white font-bold"> Agregar registro</span>
            <span className="border-l-2 border-sky-500 p-2 text-white">
              {" "}
              <AddIcon sx={{ width: 30, height: 30 }} />
            </span>
          </Link>
        </header>
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
