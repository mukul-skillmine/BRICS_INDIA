import { Box, Typography, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import RegistrationTable from "../components/comman/RegistrationTable";

const Registrations = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Registrations
      </Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label="Pending Approval" />
        <Tab label="Approved" />
        <Tab label="Rejected" />
      </Tabs>

      <Box mt={2}>
        <RegistrationTable status={tab} />
      </Box>
    </Box>
  );
};

export default Registrations;
