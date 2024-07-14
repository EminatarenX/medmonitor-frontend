import { HomePage } from "../pages/home/home.page"
import { Login } from "../pages/home/login.page"
import { Signin } from "../pages/home/signin.page"
import { GlobalLayout } from "../shared/layouts"
import { DoctorLogin } from "../pages/doctor/login.page"
import { PatientLogin } from "../pages/patient/login.page"


export const homeRouter = [
    {
        path: '/',
        element: <GlobalLayout />,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signin',
                element: <Signin /> 
            },
            {
                path: '/doctor-login',
                element: <DoctorLogin />
            },
            {
                path: '/patient-login/:id',
                element: <PatientLogin />
            }
        ]
    }
]