import { VideocamRounded } from "@mui/icons-material";
import { useVideoCallState } from "../../../stores/chat/videocall.store";
import { useLocation, useNavigate } from "react-router-dom";
interface Props {
  to: string;
  from: string;
}

export const ChatHeader = ({ to, from }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const callUser = useVideoCallState((state) => state.callUser);
  const handleSetMyVideo = useVideoCallState((state) => state.handleSetMyVideo);
  const setModalVideoCall = useVideoCallState(
    (state) => state.setModalVideoCall
  );

  // const handleCallUser = () => {
  //   setModalVideoCall(true);
  //   callUser(to!, from);
  //   handleSetMyVideo();
  // };
  console.log({from, to})

  const handleCallUser = () => {
    
    if(location.pathname === `/patient/chat`){
      navigate(`/patient/chat/call/${to}`)
    }else {
      navigate(`/doctor/patients/call/${to}`)
    }
  }
  return (
    <>
      <header className="mb-6 flex justify-between">
        <h1 className="text-3xl font-bold text-gray-300">Chat</h1>
        <div>
          <button
            onClick={handleCallUser}
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <VideocamRounded />
          </button>
        </div>
      </header>
    </>
  );
};
