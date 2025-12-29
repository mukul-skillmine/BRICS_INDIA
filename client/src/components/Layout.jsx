import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header onMenuClick={() => setMobileOpen(true)} />

      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          isMobile={isMobile}
        />

        <Box sx={{ flex: 1, p: 3, bgcolor: "#f5f6fa" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
