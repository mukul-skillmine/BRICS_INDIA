import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

export const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/home",
    icon: DashboardIcon,
  },
  {
    label: "Events",
    path: "/events",
    icon: EventIcon,
  },
  {
    label: "Registrations",
    path: "/registrations",
    icon: AssignmentIcon,
  },
  {
    label: "Participants",
    path: "/participants",
    icon: PeopleIcon,
  },
  {
    label: "Attendance",
    path: "/attendance",
    icon: HowToRegIcon,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChartIcon,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: SettingsIcon,
  },
];

