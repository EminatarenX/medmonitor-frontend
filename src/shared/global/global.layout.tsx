import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GlobalHeader } from "./header.global";
import { GlobalFooter } from "./footer.global";
import { useAuthState } from "../../stores/auth/auth.store";

export const GlobalLayout =  () => {
    const [aside, setAside] = useState(false)
    const handleAside = (state: boolean) => setAside(!state)

    const checkAuthStatus = useAuthState( state => state.checkAuthStatus)
    const authStatus = useAuthState( state => state.status)
    
    if(window.location.pathname === '/login'){
        if ( authStatus === 'pending' ) {
            checkAuthStatus();
            return (
                <div className="h-screen text-sky-950 text-6xl flex gap-5 justify-center items-center">
                    Cargando <span className="animate-spin h-20 w-20 border-x-4 border-sky-700 rounded-full "></span>
                 </div>
            )
          }
        
          if ( authStatus === 'authorized' ) {
            return <Navigate to='/admin' />;
          }
    }
  
  
    return (
        <>

            <GlobalHeader handleAside={handleAside} aside={aside}/>
            <main className="appear">
                <Outlet />
            </main>
            <GlobalFooter />
        </>
    )
}