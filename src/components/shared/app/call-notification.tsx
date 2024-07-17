import { PhoneRounded } from "@mui/icons-material";
import { useVideoCallState } from "../../../stores/chat/videocall.store";

interface Props {
  receivingCall: boolean;
  handleAcceptCall: () => void;
  senderName?: string;
}

export const CallNotification = ({
  receivingCall,
  handleAcceptCall,
  senderName,
}: Props) => {
  const handleSetMyVideo = useVideoCallState((state) => state.handleSetMyVideo);
  const callAcepted = useVideoCallState((state) => state.callAccepted);

  const answer = () => {
    handleSetMyVideo();
    handleAcceptCall();
  }
  
  return (
    <section className={`fixed top-6 w-full flex justify-center ${receivingCall ? 'block' : 'hidden'} appear transition-all`}>
      <div className="flex justify-between bg-neutral-900 p-5 rounded min-w-[300px]">
        <span className="text-white font-bold">{senderName} is calling</span>
        <button onClick={answer} className="">
          <PhoneRounded sx={{color: 'white'}} />
        </button>
      </div>
    </section>
  );
  
};
