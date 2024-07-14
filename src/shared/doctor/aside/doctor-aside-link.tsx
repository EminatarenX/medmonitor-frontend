import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "../../../stores/auth/auth.store";
interface Props {
  children: React.ReactNode;
  path?: string;
  location?: string;
}
export const DoctorAsideLink = ({ children, path, location }: Props) => {
    const navigate = useNavigate()
    const logout = useAuthState(state => state.logout)
    const handleLogout = () => {
        logout()
        navigate('/')
    }
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-1/3 h-[3px] ${
          location == path ? "bg-white" : "bg-transparent"
        } transition-all duration-500`}
      />
      {path ? (
        <Link
          to={path}
          className={`p-2 text-white hover:bg-neutral-700 mx-2 my-5 lg:m-5 rounded-xl ${
            location == path ? "bg-neutral-700" : ""
          } transition-all duration-500`}
        >
          {children}
        </Link>
      ) : (
        <button
            onClick={handleLogout}
          className={`p-2 text-white hover:bg-neutral-700 mx-2 my-5 lg:m-5 rounded-xl ${
            location == path ? "bg-neutral-700" : ""
          } transition-all duration-500`}
        >
          {children}
        </button>
      )}
    </div>
  );
};
