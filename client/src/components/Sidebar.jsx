import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "./comman/navConfig";

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
      <List sx={{ width: "100%", px: 1, mt: 2 }}>
        {NAV_ITEMS && NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <Tooltip key={item.label} title={item.label} placement="right">
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={navItemStyles}
              >
                <ListItemIcon sx={{ minWidth: 0 }}>
                  <Icon />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>
    </Drawer>
  );
};

const navItemStyles = {
  justifyContent: "center",
  height: 44,
  borderRadius: 1,
  mb: 1,
  "&.active": {
    bgcolor: "#FFF3E8",
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
