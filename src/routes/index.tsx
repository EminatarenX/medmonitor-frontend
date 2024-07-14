import { adminRouter } from "./admin.routes";
import { homeRouter } from "./home.routes";
import { NotFound as NotFoundPage } from "../shared/404";
import { createBrowserRouter } from "react-router-dom";
import { doctorRouter } from "./doctor.routes";
import { patientRouter } from "./patient.routes";

export const appRouter = createBrowserRouter([
    ...homeRouter,
    ...adminRouter,
    ...doctorRouter,
    ...patientRouter,
    {
        path: "*",
        element: <NotFoundPage />
    }
])