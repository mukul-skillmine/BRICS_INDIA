import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateAdminModal from "../components/CreateAdminModal";

const AdminList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const fetchUsers = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/users/list`,
    {
      params: {
        role: "Admin",
      },
    }
  );

  setUsers(res.data.userList || []);
};

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.first_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box mt={10}>
      {/* 🔹 BLOCK 1: HEADING */}
      <Typography variant="h5" fontWeight={600} mb={2}>
        Admin Management
      </Typography>

      {/* 🔹 BLOCK 2: SEARCH + BUTTON */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <TextField
          size="small"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 280 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "#fa7516",
            textTransform: "none",
            fontWeight: 500,
          }}
          onClick={() => setOpenModal(true)}
        >
          Create Admin
        </Button>
      </Box>

      {/* 🔹 BLOCK 3: TABLE (UNCHANGED) */}
      <Paper elevation={0} sx={{ border: "1px solid #E5E7EB" }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: "#FAFAFA" }}>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Avatar sx={{ bgcolor: "#fa7516" }}>
                        {user.first_name[0]}
                      </Avatar>
                      <Typography fontWeight={500}>
                        {user.first_name} {user.last_name}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>{user.email}</TableCell>

                  <TableCell sx={{ color: "#2563EB", fontWeight: 500 }}>
                    {user.role}
                  </TableCell>

                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ textTransform: "none" }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {!filteredUsers.length && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* 🔹 MODAL */}
      <CreateAdminModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        refresh={fetchUsers}
      />
    </Box>
  );
};

export default AdminList;
