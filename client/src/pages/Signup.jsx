import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // 🔐 Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);

  const handleSignup = async () => {
    const { first_name, last_name, email, password } = form;

    if (!first_name || !last_name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
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
          },
        }
      );

      toast.success("Account created. Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f6fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper sx={{ width: 420, p: 4 }}>
        <Typography variant="h5" fontWeight={700}>Create Account 🚀</Typography>

        <Stack spacing={2} mt={3}>
          <TextField label="First Name" size="small" onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
          <TextField label="Last Name" size="small" onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
          <TextField label="Email" size="small" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <TextField label="Password" type="password" size="small" onChange={(e) => setForm({ ...form, password: e.target.value })} />

          <Button
            variant="contained"
            disabled={loading}
            sx={{ bgcolor: "#fa7516" }}
            onClick={handleSignup}
          >
            {loading ? "Creating..." : "Sign Up"}
          </Button>
        </Stack>

        <Typography mt={3} fontSize={14} align="center">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#fa7516" }}>Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
