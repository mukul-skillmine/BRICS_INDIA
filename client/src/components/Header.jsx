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
      position="static"
      elevation={0}
      sx={{ bgcolor: "#0B145C", height: 64 }}
    >
      <Toolbar sx={{ minHeight: 64, px: 3 }}>
        {/* LEFT */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <Typography fontWeight={600}>Bric</Typography>
          <Box
            sx={{
              bgcolor: "#E8ECFF",
              color: "#0B145C",
              fontSize: 12,
              px: 1,
              py: 0.3,
              borderRadius: 1,
              fontWeight: 600,
            }}
          >
            DRAFT
          </Box>
        </Box>

        {/* CENTER */}
        <Box flex={1} display="flex" justifyContent="center" gap={2}>
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
              bgcolor: "#4F6BED",
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
