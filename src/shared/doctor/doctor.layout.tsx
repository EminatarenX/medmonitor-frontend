import { Outlet } from "react-router-dom";
import { useAuthState } from "../../stores/auth/auth.store";
import { DoctorAsideLayout } from "./aside/aside";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWsConnection } from "../../stores/ws/websocket";
import { useVideoCallState } from "../../stores/chat/videocall.store";
import { CallNotification } from "../../components/shared/app/call-notification";

export const DoctorLayout = () => {
  const checkAuthStatus = useAuthState( state => state.checkDoctorAuthStatus)
  const authStatus = useAuthState(state => state.status)
  const token = useAuthState(state => state.token)
  const navigate = useNavigate();
  const handleSocketEvents = useVideoCallState(state => state.handleSetSocketEvents)
  const receiveCall = useVideoCallState( state => state.receiveCall)
  const answerCall = useVideoCallState(state => state.answerCall)
  const caller = useVideoCallState(state => state.caller)
  const senderName = useVideoCallState(state => state.callerName)

  const handleAcceptCall = () => {
    console.log('accepting call')
    navigate(`/doctor/patients/${caller}`)
    answerCall(caller)
  
  }
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await checkAuthStatus();
      } catch (error) {
        if (error === "unauthorized") {
          navigate("/doctor-login");
        }
      }
    };
    checkAuth();
    getWsConnection(token!)
   
  }, [authStatus]);

  useEffect(() =>{
    handleSocketEvents()
  })
  
  return (
    <div className="bg-neutral-800 h-screen flex flex-col items-center">
      <DoctorAsideLayout />
      <main className="w-full overflow-y-auto h-full pb-20">
        <Outlet />
        <CallNotification senderName={senderName} receivingCall={receiveCall} handleAcceptCall={handleAcceptCall}/>
      </main>
    </div>
  );
};
