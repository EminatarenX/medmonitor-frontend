
import { MonitorHeartRounded, HomeRounded, PersonRounded, SettingsRounded, LogoutRounded } from "@mui/icons-material"

export const asideLinks = [
    {
      path: "/doctor/dashboard",
      icon: <HomeRounded sx={{ color: "white", height: 25, width: 25 }} />,
    },
    {
      path: "/doctor/patients",
      icon: <PersonRounded sx={{ color: "white", height: 25, width: 25 }} />,

    },
    {
      path: "/doctor/monitor",
      icon: <MonitorHeartRounded sx={{ color: "white", height: 25, width: 25 }} />,
    },
    {
      path: "/doctor/settings",
      icon: <SettingsRounded sx={{ color: "white", height: 25, width: 25 }} />,
    },
    {
      icon: <LogoutRounded sx={{ color: "white", height: 25, width: 25 }} />,
    }
  ]

export const useDoctorNavigation = () => {
    return {
        asideLinks
    }
}