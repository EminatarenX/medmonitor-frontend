import { useAdminNavigation } from "../../../hooks/admin/useAdminNavigation"
import { DoctorAsideLink } from "../../doctor/aside/doctor-aside-link"
import { useLocation } from 'react-router-dom'

export const AsideAdmin = () => {
  const location = useLocation()
 const { adminLinks } = useAdminNavigation ()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex justify-center p-4">
      <div className="bg-neutral-950 bg-opacity-90 rounded-full px-6 flex items-center space-x-1">
        {
          adminLinks.map((link, i) => (
            <DoctorAsideLink path={link.path} location={location.pathname} key={i+1}>
              {link.icon}
            </DoctorAsideLink>
          ))
        }
      </div>
    </nav>
  )
}