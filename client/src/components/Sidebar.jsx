import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Tooltip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import { NavLink } from "react-router-dom";

const DRAWER_WIDTH = 72;    
const HEADER_HEIGHT = 64;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
          top: `${HEADER_HEIGHT}px`,
          height: `calc(100% - ${HEADER_HEIGHT}px)`,
          borderRight: "1px solid #fa7516",
          display: "flex",
          alignItems: "center",
        },
      }}
    >
      <Box mt={2} width="100%">
        <List sx={{ px: 1 }}>
          
          {/* DASHBOARD */}
          <Tooltip title="Dashboard" placement="right">
            <ListItemButton
              component={NavLink}
              to="/"
              sx={navItemStyles}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <DashboardIcon />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>

          {/* EVENTS */}
          <Tooltip title="Events" placement="right">
            <ListItemButton
              component={NavLink}
              to="/events"
              sx={navItemStyles}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <EventIcon />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>

        </List>
      </Box>
    </Drawer>
  );
};

const navItemStyles = {
  justifyContent: "center",
  height: 44,
  borderRadius: 1,
  mb: 1,
  "&.active": {
    bgcolor: "#EEF2FF",
    color: "#fa7516",
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 8,
      bottom: 8,
      width: 4,
      bgcolor: "#fa7516",
      borderRadius: 4,
    },
  },
};

export default Sidebar;
