import { Layout } from "../components/shared/layouts/layout";
import { PatientChatPage } from "../pages/patient/chat/chat.page";
import { PatientDashboardPage } from "../pages/patient/dashboard/dashboard.page";
import VideoCallPage from "../pages/shared/videocall.page";

export const patientRouter = [
    {
        path: '/patient',
        element: <Layout />,
        children: [
            {
                path: 'dashboard',
                element: <PatientDashboardPage />
            },
            {
                path: 'chat',
                element: <PatientChatPage />
            },
            {
                path: 'chat/call/:id',
                element: <VideoCallPage />
            }
        ]
    }

]