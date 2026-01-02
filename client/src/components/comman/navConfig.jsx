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
    roles: ["Super Admin", "Admin", "Visitor"],
  },
  {
    label: "Events",
    path: "/events",
    icon: EventIcon,
    roles: ["Super Admin", "Admin", "Visitor"], // Visitor can VIEW events
  },
  {
    label: "Create Admin",
    path: "/admins",
    icon: PeopleIcon,
    roles: ["Super Admin"],
  },
  {
    label: "Approval List",
    path: "/approvals",
    icon: AssignmentIcon,
    roles: ["Super Admin", "Admin", "Visitor"], // Visitor sees own approvals
  },
  {
    label: "Participants",
    path: "/participants",
    icon: PeopleIcon,
    roles: ["Super Admin", "Admin"],
  },
  {
    label: "Attendance",
    path: "/attendance",
    icon: HowToRegIcon,
    roles: ["Admin"],
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChartIcon,
    roles: ["Super Admin"],
  },
  {
    label: "Settings",
    path: "/settings",
    icon: SettingsIcon,
    roles: ["Super Admin"],
  },
];
