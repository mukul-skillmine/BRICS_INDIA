import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
} from "@mui/material";
import ApprovalActions from "./ApprovalActions";

/* TEMP MOCK DATA (API later) */
const mockData = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    event: "BRICS Summit",
    status: "pending",
  },
  {
    id: 2,
    name: "Amit Verma",
    email: "amit@gmail.com",
    event: "G20 Meet",
    status: "approved",
  },
];

const statusMap = {
  0: "pending",
  1: "approved",
  2: "rejected",
};

const ApprovalTable = ({ status }) => {
  const filteredData = mockData.filter(
    (row) => row.status === statusMap[status]
  );

  return (
    <Paper elevation={0} sx={{ border: "1px solid #E5E7EB" }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ bgcolor: "#FAFAFA" }}>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>Status</TableCell>
              {status === 0 && <TableCell align="right">Action</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id} hover>
                {/* USER */}
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar sx={{ bgcolor: "#fa7516" }}>
                      {row.name[0]}
                    </Avatar>
                    <Typography fontWeight={500}>
                      {row.name}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell>{row.email}</TableCell>
                <TableCell>{row.event}</TableCell>

                <TableCell
                  sx={{
                    fontWeight: 500,
                    color:
                      row.status === "approved"
                        ? "#16A34A"
                        : row.status === "rejected"
                        ? "#DC2626"
                        : "#F59E0B",
                  }}
                >
                  {row.status}
                </TableCell>

                {status === 0 && (
                  <TableCell align="right">
                    <ApprovalActions />
                  </TableCell>
                )}
              </TableRow>
            ))}

            {!filteredData.length && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Approval found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ApprovalTable;
