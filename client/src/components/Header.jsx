import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

const Header = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        height: 64,
        background: "linear-gradient(180deg, #ff8a3d 80%, #fa7516 100%)",
        borderBottom: "4px solid #e56712",
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: 2 }}>
        
        {/* MOBILE MENU */}
        {isMobile && (
          <IconButton color="inherit" onClick={onMenuClick} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
        )}

        {/* LEFT */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography fontWeight={700}>BRICS</Typography>
          {!isMobile && (
            <Box
              sx={{
                bgcolor: "#FFF3E8",
                color: "#9A3412",
                fontSize: 12,
                px: 1,
                py: 0.3,
                borderRadius: 1,
                fontWeight: 600,
              }}
            >
              DRAFT
            </Box>
          )}
        </Box>

        {/* CENTER (HIDE ON MOBILE) */}
        {!isMobile && (
          <Box flex={1} display="flex" justifyContent="center" gap={2}>
            <Typography fontSize={13} opacity={0.9}>
              Sat Jan 17, 2026 · 08:00 AM (IST)
            </Typography>
            <Typography fontSize={13} opacity={0.9}>
              English
            </Typography>
          </Box>
        )}

        {/* RIGHT */}
        <Box display="flex" alignItems="center" gap={1.5} ml="auto">
          {!isMobile && (
            <>
              <Button color="inherit" size="small">
                Edit Website
              </Button>
              <Button color="inherit" size="small">
                Preview
              </Button>
            </>
          )}

          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: "#e56712",
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Publish
          </Button>

          <Avatar sx={{ width: 32, height: 32 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
