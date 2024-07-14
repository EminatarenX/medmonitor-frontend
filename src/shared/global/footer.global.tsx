import { useLocation } from "react-router-dom";

export const GlobalFooter = () => {
  const location = useLocation();

  const isPatientLogin = location.pathname.startsWith('/patient-login/');
  const className = isPatientLogin ? 'hidden' : '';
  return (
    <footer className={`flex justify-center p-10 ${location.pathname === '/doctor-login'  && 'hidden'} ${className}`}>
        <span className="text-sm text-neutral-400">
            &copy; 2024 MedMonitor. All rights reserved.
        </span>
    </footer>
  )
}
