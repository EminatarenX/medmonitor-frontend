

import {LogoutRounded,BadgeOutlined, PersonRounded, SettingsRounded, MonitorHeartRounded, HomeRounded } from "@mui/icons-material"
const adminLinks = [
    {
      path: '/admin',
      icon: <HomeRounded className="text-white w-6 h-6" />
    },
    {
      path: '/admin/patients',
      icon:   <PersonRounded className="text-white w-6 h-6" />
    },
    {
      path: '/admin/doctors',
      icon: <BadgeOutlined className="text-white w-6 h-6" />
    },
    {
      path: '/admin/monitor',
      icon: <MonitorHeartRounded className="text-white w-6 h-6" />
    },
    {
      path: '/admin/settings',
      icon:  <SettingsRounded className="text-white w-6 h-6" />
    },
    {
      icon:  <LogoutRounded className="text-white w-6 h-6" />
    }
  ]

export const useAdminNavigation = () => {
    return {
        adminLinks
    }
}