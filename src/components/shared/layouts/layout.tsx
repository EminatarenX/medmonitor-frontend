import { ChatBubbleRounded, LogoutRounded, MonitorHeartRounded, PhoneRounded } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import { DoctorAsideLink } from "../../../shared/doctor/aside/doctor-aside-link";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuthState } from "../../../stores/auth/auth.store";
import { getWsConnection } from "../../../stores/ws/websocket";
import { useVideoCallState } from "../../../stores/chat/videocall.store";
import { CallNotification } from "../app/call-notification";

export const Layout = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const authStatus = useAuthState((state) => state.status);
    const checkAuthStatus = useAuthState( state => state.checkPatientAuthStatus)
    const token = useAuthState(state => state.token)
    const receiveCall = useVideoCallState(state => state.receiveCall)
    const handleSetSocketEvents = useVideoCallState(state => state.handleSetSocketEvents)
    const callerName = useVideoCallState(state => state.callerName)
    const callerId = useVideoCallState(state => state.caller)
    const answerCall = useVideoCallState( state => state.answerCall)
    
    const asideLinks = [
        {
            path: "/patient/dashboard",
            icon: <MonitorHeartRounded />,

        },
        {
            path: '/patient/chat',
            icon: <ChatBubbleRounded />
        },
        {
          icon: <LogoutRounded />
        }
    ]

    const handleAcceptCall = () => {
      console.log('accepting call')
      navigate('/patient/chat')
      answerCall(callerId)
    }

    useEffect(() => {
      const checkAuth = async () => {
        try {
          await checkAuthStatus();
        } catch (error) {
          if (error === "unauthorized") {
            navigate("/login");
          }
        }
      };
      checkAuth();
      getWsConnection(token!)
      handleSetSocketEvents()
    }, [authStatus]);


  
  return (
    <div className="bg-neutral-800 h-screen flex flex-col items-center">
         <aside className="  bg-neutral-950 z-20  bg-opacity-90  flex justify-center px-10 rounded-full  fixed bottom-0">
      {asideLinks.map((link, index) => (
        <DoctorAsideLink key={index} path={link.path} location={location.pathname} >
          {link.icon}
        </DoctorAsideLink>
      ))}
    </aside>
      <main className="w-full overflow-y-auto h-full pb-20">
        <Outlet />
       <CallNotification receivingCall={receiveCall} senderName={callerName}  handleAcceptCall={handleAcceptCall}/>
      </main>
    </div>
  )
}
