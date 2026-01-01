import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { getUser, logout } from "../utils/auth";

const HEADER_HEIGHT = 64;

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);

  const user = getUser();
  console.log("user", user);
  const name = user?.first_name || "User";
  const role = user?.role || "";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        height: HEADER_HEIGHT,
        background: "linear-gradient(180deg, #ff8a3d 80%, #fa7516 100%)",
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ minHeight: HEADER_HEIGHT }}>
        {isMobile && (
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
        )}

        <Typography fontWeight={700}>BRICS</Typography>

        <Box ml="auto" display="flex" alignItems="center" gap={1}>
          <Box textAlign="right" mr={1}>
            <Typography fontSize={13} fontWeight={600}>
              {name}
            </Typography>
            <Typography fontSize={11} opacity={0.8}>
              {role}
            </Typography>
          </Box>

          <Avatar
            sx={{ bgcolor: "#fff", color: "#fa7516", cursor: "pointer" }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            {name.charAt(0).toUpperCase()}
          </Avatar>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
