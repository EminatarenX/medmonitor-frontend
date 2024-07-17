import { Modal } from "@mui/material";
import { DarkCardContainer } from "../container/dark-card.component";
import { FlexRowSection } from "../container/flex-row.component";
import { useVideoCallState } from "../../../stores/chat/videocall.store";
import { VideoComponent } from "./video.component";
import { PhoneCallback } from "@mui/icons-material";
import { useEffect } from "react";

interface Props {
  leaveCall: () => void;
}

export const ModalVideoCall = ({ leaveCall }: Props) => {
  const myVideo = useVideoCallState((state) => state.myVideo);
  const callingUser = useVideoCallState((state) => state.callingUser);
  const callAccepted = useVideoCallState((state) => state.callAccepted);
  const userVideo = useVideoCallState((state) => state.userVideo);
  const callEnded = useVideoCallState((state) => state.callEnded);
  const setModalVideoCall = useVideoCallState((state) => state.setModalVideoCall);
  const modalVideoCall = useVideoCallState((state) => state.modalVideoCall);

  const handleLeaveCall = () => {
    leaveCall();
    setModalVideoCall(false);
  };

  useEffect(() => {
    console.log({ userVideo, myVideo });
  }, [userVideo, myVideo]);

  return (
    <Modal onClose={handleLeaveCall} open={modalVideoCall!}>
      <>
        <DarkCardContainer width="full">
          <section className="flex gap-2 flex-col mt-5 lg:flex-row w-full">
            <VideoComponent video={myVideo} width="full" />
            {callAccepted && !callEnded && (
              <VideoComponent video={userVideo} width="full" />
            )}
          </section>
          <article className="w-full flex justify-center">
            {callingUser && (
              <FlexRowSection>
                <button
                  onClick={handleLeaveCall}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-full"
                >
                  <PhoneCallback />
                </button>
              </FlexRowSection>
            )}
          </article>
        </DarkCardContainer>
      </>
    </Modal>
  );
};
