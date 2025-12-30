import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ApprovalActions from "./ApprovalActions";

const mockData = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    event: "BRICS Summit",
    status: "pending",
  },
];

const RegistrationTable = ({ status }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Event</TableCell>
            <TableCell>Status</TableCell>
            {status === 0 && <TableCell>Action</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {mockData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.event}</TableCell>
              <TableCell>{row.status}</TableCell>

              {status === 0 && (
                <TableCell>
                  <ApprovalActions />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default RegistrationTable;
