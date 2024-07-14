import { useEffect, useRef, useState } from "react";
import MonitoredPatientCard from "../../../../components/shared/app/monitored-patient-card.component";
import { ChatContainer } from "../../../../components/shared/container/chat-container.component";
import { DarkCardContainer } from "../../../../components/shared/container/dark-card.component";
import { ArticleTitle } from "../../../../components/shared/text/articletitle.component";
import { Title } from "../../../../components/shared/text/title.component";
import { useParams } from "react-router-dom";
import { usePatientChatPage } from "../../../../hooks/doctor/usepatient.chat.page";
import { socket } from "../../../../stores/ws/websocket";
import Peer, { SignalData } from "simple-peer";
import { VideoComponent } from "../../../../components/shared/app/video.component";
import { FlexRowSection } from "../../../../components/shared/container/flex-row.component";
import { useVideoCallState } from "../../../../stores/chat/videocall.store";
import { ModalVideoCall } from "../../../../components/shared/app/modal-video-call.component";

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
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState<SignalData | null>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [caller, setCaller] = useState("");

  // const myVideo = useRef<HTMLVideoElement>(null);
  const myVideo = useVideoCallState((state) => state.myVideo);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);
  const handleSetMyVideo = useVideoCallState((state) => state.handleSetMyVideo);
  const callingUser = useVideoCallState((state) => state.callingUser);
  const receiveCall = useVideoCallState((state) => state.receiveCall);

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current?.destroy(); // Usa el operador de encadenamiento opcional para evitar errores
  };
  useEffect(() => {
    const getData = async () => {
      await getPatientInformation(patientId!);
      await getPatientChat(patientId!);
    };

    getData();
    // handleSetMyVideo()
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

            <MonitoredPatientCard
              patient={{
                id: patientId!,
                name: "" || "",
                heartRate: 80,
                oxygenSaturation: 98,
                timeLabels: ["Mayo", "Junio", "Julio", "Agosto", "Septiembre"],
                heartRateData: [7, 4, 8, 23, 22],
                oxygenData: [5, 10, 15, 20, 25],
              }}
            />
          </article>
          <DarkCardContainer width="w-2/3">
            <ChatContainer
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
    </section>
  );
};
