import { Layout } from "../components/shared/layouts/layout";
import { PatientChatPage } from "../pages/patient/chat/chat.page";
import { PatientDashboardPage } from "../pages/patient/dashboard/dashboard.page";

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
            }
        ]
    }

]