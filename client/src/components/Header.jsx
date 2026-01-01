import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { getUser, logout } from "../utils/auth";

const Header = () => {
  const user = getUser();
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        height: 64,
        background: "linear-gradient(180deg, #ff8a3d 80%, #fa7516 100%)",
      }}
    >
      <Toolbar>
        <Typography fontWeight={700}>BRICS</Typography>

        <Box ml="auto" display="flex" alignItems="center" gap={2}>
          {user && (
            <>
              <Box textAlign="right">
                <Typography fontSize={14}>{user.first_name} {user.last_name}</Typography>
                <Typography fontSize={12} opacity={0.8}>{user.role}</Typography>
              </Box>

              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar>{user.first_name?.[0]}</Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
