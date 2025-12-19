import { Box } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <Box sx={{ flex: 1, p: 3, bgcolor: "#f5f6fa" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
