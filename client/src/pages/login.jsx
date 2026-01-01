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

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    // 🔐 Redirect if already logged in
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);

    const handleLogin = async () => {
        if (!form.email || !form.password) {
            toast.error("Email and password are required");
            return;
        }

        try {
            setLoading(true);
            debugger
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/users/login`,
                {
                    payload: {
                        email: form.email,
                        password: form.password,
                    },
                }
            );

            localStorage.setItem("token", res.data.token || "dummy");
            localStorage.setItem("user", JSON.stringify(res.data.user || {}));
            toast.success("Login successful");
            navigate("/home");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f6fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Paper sx={{ width: 380, p: 4 }}>
                <Typography variant="h5" fontWeight={700}>Welcome Back 👋</Typography>
                <Typography fontSize={14} color="text.secondary" mb={3}>
                    Login to continue
                </Typography>

                <Stack spacing={2}>
                    <TextField
                        label="Email"
                        size="small"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        size="small"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <Button
                        variant="contained"
                        disabled={loading}
                        sx={{ bgcolor: "#fa7516" }}
                        onClick={handleLogin}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </Stack>

                <Typography mt={3} fontSize={14} align="center">
                    Don’t have an account?{" "}
                    <Link to="/signup" style={{ color: "#fa7516" }}>Sign up</Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;
