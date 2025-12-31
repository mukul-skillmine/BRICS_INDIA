import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
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

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          height: HEADER_HEIGHT,
          background: "linear-gradient(180deg, #ff8a3d 80%, #fa7516 100%)",
          borderBottom: "4px solid #e56712",
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ minHeight: HEADER_HEIGHT }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setOpenMenu(true)}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography fontWeight={700}>BRICS</Typography>

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

      {/*  MOBILE DRAWER FIXED */}
      <Drawer
        anchor="left"
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: 260,
            top: HEADER_HEIGHT,
            height: `calc(100% - ${HEADER_HEIGHT}px)`,
          },
        }}
      >
        <List>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <ListItemButton
                key={item.label}
                component={NavLink}
                to={item.path}
                onClick={() => setOpenMenu(false)}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
