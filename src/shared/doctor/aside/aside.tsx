
import { DoctorAsideLink } from "./doctor-aside-link";
import { useLocation } from "react-router-dom";
import { useDoctorNavigation } from "../../../hooks/doctor/usedoctornavigation";
export const DoctorAsideLayout = () => {
 
  const location = useLocation();
  const { asideLinks} = useDoctorNavigation();
  return (
    <aside className="  bg-neutral-950 z-20  bg-opacity-90  flex justify-center px-10 rounded-full  fixed bottom-0">
      {asideLinks.map((link, index) => (
        <DoctorAsideLink key={index} path={link.path} location={location.pathname}>
          {link.icon}
        </DoctorAsideLink>
      ))}
    </aside>
  );
};
