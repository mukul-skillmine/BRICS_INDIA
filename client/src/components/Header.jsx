import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar,
} from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
sx={{
  height: 64,
  background: "linear-gradient(180deg, #ff8a3d 80%, #fa7516 100%)",
  borderBottom: "4px solid #e56712",
}}    >
      <Toolbar sx={{ minHeight: 64, px: 3,}} >
        {/* LEFT */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <Typography fontWeight={600}>BRICS</Typography>
          <Box
            sx={{
              bgcolor: "#E8ECFF",
              color: "#0B145C",
              fontSize: 12,
              px: 1,
              py: 0.3,
              mr:1,
              borderRadius: 1,
              fontWeight: 600,
            }}
          >
            DRAFT
          </Box>
        </Box>

        {/* start */}
        <Box flex={1} display="flex" justifyContent="start" gap={2}>
          <Typography fontSize={13} opacity={0.9}>
            Sat Jan 17, 2026 - 08:00 AM (IST)
          </Typography>
          <Typography fontSize={13} opacity={0.9}>
            English
          </Typography>
        </Box>

        {/* RIGHT */}
        <Box display="flex" alignItems="center" gap={2}>
          <Button color="inherit" size="small">
            Edit Website
          </Button>
          <Button color="inherit" size="small">
            Preview
          </Button>
          <Button
            variant="contained"
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
