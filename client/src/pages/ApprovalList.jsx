import { Box, Typography, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import ApprovalTable from "../components/comman/ApprovalTable";

const ApprovalList = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box mt={10}>
      {/* 🔹 PAGE HEADING */}
      <Typography variant="h5" fontWeight={600} mb={2}>
        Approvals
      </Typography>

      {/* 🔹 TABS */}
      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        <Tab label="Pending Approval" />
        <Tab label="Approved" />
        <Tab label="Rejected" />
      </Tabs>

      {/* 🔹 TABLE */}
      <Box mt={2}>
        <ApprovalTable status={tab} />
      </Box>
    </Box>
  );
};

export default ApprovalList;
