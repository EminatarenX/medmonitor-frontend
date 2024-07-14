import { AdminMonitorPage } from "../pages/admin/monitor.page";
import { DashboardPage } from "../pages/admin/dashboard.page";
import { DoctorsPage } from "../pages/admin/doctors.page";
import { NewDoctorPage } from "../pages/admin/doctors/newdoctor.page";
import { PatientsPage } from "../pages/admin/patients.page";
import { NewPatientPage } from "../pages/admin/patients/newPatient.page";
import { PatientProfilePage } from "../pages/admin/patients/[id]/profile.page";
import { ProfileDoctorPage } from "../pages/admin/doctors/[id]/profile.page";
import { AdminLayout } from "../shared/layouts";



export const adminRouter = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "doctors",
        element: <DoctorsPage />,
      },
      {
        path: "patients",
        element: <PatientsPage />,
      },
      {
        path: "monitor",
        element: <AdminMonitorPage />,
      },
      {
        path: "doctors/new",
        element: <NewDoctorPage />,
      },
      {
        path: "patients/new",
        element: <NewPatientPage />,
      },
      {
        path: "patients/:id",
        element: <PatientProfilePage />,
      },
      {
        path: "doctors/:id",
        element: <ProfileDoctorPage />,
      },
    ],
  },
];
