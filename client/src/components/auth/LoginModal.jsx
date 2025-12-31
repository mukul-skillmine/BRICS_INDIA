import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import useEscapeKey from "../../hooks/useEscapeKey";

/* ---------------- VALIDATION ---------------- */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email"),
  password: z.string().min(8, "Password is required"),
});

const LoginModal = ({ setShowLogin, setShowRegister,onClose }) => {
  useEscapeKey(() => {
    onClose(); // 🔥 closes AuthContainer + Header
  });

  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/login`, data);

      toast.success("Login successful");
      setShowLogin(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-gray-500/60 flex items-center justify-center text-black">
      <div className="w-[420px] bg-white rounded-xl overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-3 border-b">
          <div>
            <p className="text-lg font-semibold">LOGIN</p>
            <p className="text-xs text-gray-500">
              Welcome back! Please login to continue
            </p>
          </div>

          <IoCloseOutline
            onClick={() => setShowLogin(false)}
            className="text-2xl cursor-pointer hover:text-orange-600"
          />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* EMAIL */}
          <div>
            <label className="text-xs text-gray-800">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              className="input-field"
              placeholder="Enter Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-xs text-gray-800">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowLogin(false)}
              className="border border-gray-400 px-4 py-1 rounded-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-1 rounded-md text-white
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* REGISTER REDIRECT */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setShowLogin(false);
                  setShowRegister(true);
                }}
                className="text-orange-600 font-medium hover:underline"
              >
                Register here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
