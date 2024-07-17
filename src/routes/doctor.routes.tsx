import { DoctorDashboard } from "../pages/doctor/dashboard/dashboard.page";
import { DoctorPatientsPage } from "../pages/doctor/patients/patients.page";
import { DoctorLayout } from "../shared/layouts";
import { DoctorMonitorPage } from "../pages/doctor/monitor/monitor.page";
import { DoctorSettingsPage } from "../pages/doctor/settings/settings.page";
import { DoctorPatientPage } from "../pages/doctor/patients/[id]/patient.page";
import VideoCallPage from "../pages/shared/videocall.page";

export const doctorRouter = [{
    path: '/doctor',
    element: <DoctorLayout />,
    children: [
        {

            path: 'dashboard',
            element: <DoctorDashboard />
        },
        {
            path: 'patients',
            element: <DoctorPatientsPage />
        },
        {
            path: 'monitor',
            element: <DoctorMonitorPage />
        },
        {
            path: 'settings', 
            element: <DoctorSettingsPage />
        },
        {
            path: 'patients/:id',
            element: <DoctorPatientPage />
        },
        {
            path: 'patients/call/:id',
            element: <VideoCallPage />
        }
    ]
}]