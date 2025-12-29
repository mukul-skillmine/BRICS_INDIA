import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <Box sx={{ display: "flex", flex: 1 }}>
        {/* DESKTOP ONLY */}
        {!isMobile && <Sidebar />}

        <Box sx={{ flex: 1, p: 2, bgcolor: "#f5f6fa" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
