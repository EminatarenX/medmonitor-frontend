import { Modal } from "@mui/material";
import { DarkCardContainer } from "../container/dark-card.component";
import { FlexRowSection } from "../container/flex-row.component";
import { useVideoCallState } from "../../../stores/chat/videocall.store";
import { VideoComponent } from "./video.component";

interface Props {
  leaveCall: () => void;
}
export const ModalVideoCall = ({ leaveCall }: Props) => {
  const myVideo = useVideoCallState((state) => state.myVideo);
  const callingUser = useVideoCallState((state) => state.callingUser);
  const callAccepted = useVideoCallState((state) => state.callAcepted);
  const userVideo = useVideoCallState((state) => state.userVideo);
  const  callEnded = useVideoCallState((state) => state.callEnded);
  const setModalVideoCall = useVideoCallState(
    (state) => state.setModalVideoCall
  );
  const modalVideoCall = useVideoCallState((state) => state.modalVideoCall);

  const handleLeaveCall = () => {
    leaveCall();
    setModalVideoCall(false);
  }

  return (
    <Modal onClose={handleLeaveCall} open={modalVideoCall!} >
      <>
      <DarkCardContainer width="full">
        <section className="flex gap-2 flex-col mt-5 lg:flex-row w-full">
          {myVideo && (
            <DarkCardContainer width="w-full">
              <VideoComponent video={myVideo} width={"full"} />
              
            </DarkCardContainer>
            
          )}
          {
            callAccepted && !callEnded ?
            (
              <DarkCardContainer width="full">
                <VideoComponent video={userVideo} width="full"/>
              </DarkCardContainer>
            ):
              null
          }
        </section>
        <article className="w-full">
                {callingUser && (
                  <FlexRowSection>
                    <button
                      onClick={handleLeaveCall}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 w-full"
                    >
                      Colgar
                    </button>
                  </FlexRowSection>
                )}
              </article>
      </DarkCardContainer>
      </>
    </Modal>
  );
};
