import {  Outlet, useNavigate } from "react-router-dom";
import { AsideAdmin } from "./aside/aside.admin";
import { useAuthState } from "../../stores/auth/auth.store";
import { useEffect } from "react";

export const AdminLayout = () => {
  const checkAuthStatus = useAuthState((state) => state.checkAuthStatus);
  const authStatus = useAuthState((state) => state.status);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await checkAuthStatus();
      } catch (error) {
        if (error === "unauthorized") {
          navigate("/login");
        }
      }
    };
    checkAuth();
  }, [authStatus]);

  return (
   <main className="flex flex-col h-screen bg-neutral-950">
  <div className="flex flex-grow overflow-hidden">
    <AsideAdmin />
    <div className="flex-1 overflow-y-auto scrollbar-hide bg-neutral-900 p-6">
      <div className="max-w-7xl mx-auto pb-40">
        <Outlet />
      </div>
    </div>
  </div>
</main>
  );
};
