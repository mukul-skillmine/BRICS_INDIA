import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateAdminModal = ({ open, onClose, refresh }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "Admin",
  });

  const handleSubmit = async () => {
    const { first_name, last_name, email, password, role } = form;

    if (!first_name || !email || !password) {
      toast.error("Required fields missing");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/users/create`,
        {
          payload: {
            first_name,
            last_name,
            email,
            password,
            role,
          },
        }
      );

      toast.success("Admin created successfully");
      refresh();
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography fontWeight={600}>Create Admin</Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2} mt={1}>
          <TextField
            label="First Name"
            value={form.first_name}
            onChange={(e) =>
              setForm({ ...form, first_name: e.target.value })
            }
            required
          />

          <TextField
            label="Last Name"
            value={form.last_name}
            onChange={(e) =>
              setForm({ ...form, last_name: e.target.value })
            }
          />

          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <TextField
            label="Password"
            type="password"
            helperText="Min 8 chars with uppercase, lowercase, number & symbol"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <TextField
            select
            label="Role"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          sx={{ bgcolor: "#fa7516" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Admin"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAdminModal;
