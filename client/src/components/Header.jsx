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
<<<<<<< HEAD
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "./comman/navConfig";
// import RegisterModal from "./auth/RegisterModal";
import AuthContainer from "./auth/AuthContainer";

const HEADER_HEIGHT = 64;

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openMenu, setOpenMenu] = useState(false);
  // const [showRegister, setShowRegister] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
=======
import { getUser, logout } from "../utils/auth";

const Header = () => {
  const user = getUser();
  const [anchorEl, setAnchorEl] = useState(null);
>>>>>>> origin/HemantNewFeature

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

<<<<<<< HEAD
          <Box ml="auto" display="flex" gap={1}>
            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: "#e56712", textTransform: "none" }}
            >
              Publish
            </Button>
            <Avatar sx={{ width: 32, height: 32 }} />

              {/* <Button
        size="small"
        variant="contained"
        sx={{ bgcolor: "#e56712", textTransform: "none" }}
        onClick={() => setShowRegister(true)}
      >
        Register
      </Button> */}
       <Button
            variant="contained"
            size="small"
            sx={{ bgcolor: "#e56712" }}
            onClick={() => setOpenAuth(true)}
          >
            Register
          </Button>
          </Box>
          
        </Toolbar>
        {/* {showRegister && (
        <RegisterModal setShowModal={setShowRegister} />
      )} */}
      {openAuth && <AuthContainer onClose={() => setOpenAuth(false)} />}
      </AppBar>
=======
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar>{user.first_name?.[0]}</Avatar>
              </IconButton>
>>>>>>> origin/HemantNewFeature

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
