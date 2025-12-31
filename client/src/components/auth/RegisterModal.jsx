import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import OtpModal from "../OtpModal";
import FullScreenLoader from "../../features/FullScreenLoader";
import useEscapeKey from "../../hooks/useEscapeKey";

const RegisterModal = ({ setShowModal, setShowLogin,onClose  }) => {

  useEscapeKey(() => {
    if (showOtpModal) {
      setShowOtpModal(false);
    } else {
      onClose(); // 🔥 closes AuthContainer + Header state
    }
  });
  /* -------------------- LOCAL STATE -------------------- */
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  console.log("sendingOtp", sendingOtp);
  console.log("otp modal value", showOtpModal);

  /* ---------------- VALIDATION SCHEMA ---------------- */
  const registerSchema = z.object({
    firstName: z.string().min(3, "First name is required"),
    lastName: z
      .string()
      .optional(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    password: z.string().min(8, "Password is required"),
    phone: z.string().min(10, "Phone number required"),
    image: z.string().optional(),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    pincode: z.string().min(1, "Pincode is required"),
    country: z.string().min(1, "Country is required"),
  });

  /* -------------------- FORM -------------------- */
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const emailValue = useWatch({ control, name: "email" });
  const selectedMode = watch("mode");

  /* -------------------- EMAIL OTP FLOW -------------------- */
  //   const handleVerifyEmail = async () => {
  //     const email = watch("email");
  //     if (!email) return;

  //     try {
  //       setSendingOtp(true);

  //       await axios.post(`${import.meta.env.VITE_BASE_URL}/api/otp/send`, {
  //         email,
  //       });
  //     //   setShowModal(false);
  //     //   setSendingOtp(false);
  //     //   setShowOtpModal(true);
  //       toast.success("OTP sent successfully");

  //       // 2️⃣ let loader render at least once
  //     setTimeout(() => {
  //       setSendingOtp(false);   // hide loader
  //       setShowOtpModal(true);  // show OTP modal
  //     }, 600);
  //     } catch (err) {
  //       setSendingOtp(false);
  //       toast.error(err.response?.data?.message || "Failed to send OTP");
  //     }
  //   };

  const handleVerifyEmail = async () => {
    const email = watch("email");
    if (!email) return;

    try {
      setSendingOtp(true);

      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/otp/send`, {
        email,
      });

      toast.success("OTP sent successfully");

      setSendingOtp(false);
      setShowOtpModal(true);
    } catch (err) {
      setSendingOtp(false);
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (otp) => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/otp/verify`, {
        email: watch("email"),
        otp,
      });

      toast.success("Email verified successfully");
      setEmailVerified(true);
      setShowOtpModal(false);
    } catch (err) {
      toast.error("Invalid OTP");
    }
  };

  /* -------------------- SUBMIT -------------------- */
  const onSubmit = async (data) => {
    if (!emailVerified) {
      toast.error("Please verify your email first");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        state: data.state,
        city: data.city,
        pincode: data.pincode,
        country: data.country,
      };

      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/create`, {
        payload,
      });

      toast.success("User register successfully!");
      setShowModal(false);
    } catch (err) {
      toast.error("Failed to register user");
    } finally {
      setLoading(false);
    }
  };

  const countryOptions = [
    { value: "india", label: "India" },
    { value: "brazil", label: "Brazil" },
    { value: "russia", label: "Russia" },
    { value: "china", label: "China" },
    { value: "south-africa", label: "South Africa" },
  ];

  //   const isEmailInvalid = !emailValue || !!errors.email;

  const isEmailValid = !!emailValue && !errors.email;

  return (
    <>
      <div className="fixed inset-0 z-[9999] bg-gray-500/60 flex items-center justify-center text-black">
        <div className="w-[520px] bg-white rounded-xl overflow-hidden">
          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-3 border-b">
            <div>
              <p className="text-lg text-black font-semibold tracking-wide">
                REGISTRATION
              </p>
              <p className="text-xs text-gray-500">
                Please fill in the details to create your account
              </p>
            </div>

            <IoCloseOutline
              onClick={() => setShowModal(false)}
              className="text-2xl cursor-pointer hover:text-orange-600 transition"
            />
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            {/* FIRST NAME */}
            <div>
              <label className="text-xs text-gray-800">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                className="input-field"
                placeholder="Enter First name"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* LAST NAME (OPTIONAL) */}
            <div>
              <label className="text-xs text-gray-800">
                Last Name <span className="text-gray-400">(optional)</span>
              </label>
              <input
                className="input-field"
                placeholder="Enter Last name"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-xs text-gray-800">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Provide Email ID"
                  disabled={emailVerified}
                  {...register("email")}
                  className={`input-field pr-20 ${
                    emailVerified ? "bg-gray-100" : ""
                  }`}
                />

                <button
                  type="button"
                  disabled={!isEmailValid || emailVerified || sendingOtp}
                  onClick={handleVerifyEmail}
                  className={`absolute right-2 top-1/2 -translate-y-1/2
    flex items-center gap-1 text-sm font-medium
    ${
      sendingOtp
        ? "text-gray-400 cursor-wait"
        : emailVerified
        ? "text-green-600 cursor-default"
        : !isEmailValid
        ? "text-gray-400 cursor-not-allowed"
        : "text-black-600 hover:text-black-700"
    }`}
                >
                  {sendingOtp
                    ? "Sending..."
                    : emailVerified
                    ? "Verified ✓"
                    : "Verify"}
                </button>
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs text-gray-800">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                className="input-field"
                placeholder="Enter Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <label className="text-xs text-gray-800">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                className="input-field"
                placeholder="Enter Phone Number"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* STATE */}
              <div>
                <label className="text-xs text-gray-800">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  className="input-field"
                  placeholder="Enter State"
                  {...register("state")}
                />
                {errors.state && (
                  <p className="text-red-500 text-xs">{errors.state.message}</p>
                )}
              </div>

              {/* CITY */}
              <div>
                <label className="text-xs text-gray-800">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  className="input-field"
                  placeholder="Enter City"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs">{errors.city.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* PINCODE */}
              <div>
                <label className="text-xs text-gray-800">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  className="input-field"
                  placeholder="Enter Pincode"
                  {...register("pincode")}
                />
                {errors.pincode && (
                  <p className="text-red-500 text-xs">
                    {errors.pincode.message}
                  </p>
                )}
              </div>

              {/* COUNTRY */}
              <div className="text-black">
                <label className="text-xs text-gray-800">
                  Country <span className="text-red-500">*</span>
                </label>

                <select {...register("country")} className="input-field">
                  <option value="">Select country</option>
                  {countryOptions.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>

                {errors.country && (
                  <p className="text-red-500 text-xs">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            {/* FOOTER BUTTONS */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="border border-gray-400 px-4 py-1 rounded-md hover:border-gray-600 text-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !emailVerified}
                className={`px-4 py-1 rounded-md transition
    ${
      loading || !emailVerified
        ? "bg-gray-400 cursor-not-allowed text-white"
        : "bg-orange-500 hover:bg-orange-600 text-white"
    }`}
              >
                {loading ? "Submitting..." : "Register"}
              </button>
            </div>
            {/* EMAIL VERIFY HINT */}
            {!emailVerified && (
              <p className="text-xs text-gray-500 text-right">
                Please verify your email to enable registration
              </p>
            )}

            {/* LOGIN REDIRECT */}
<div className="text-center mt-4">
  <p className="text-sm text-gray-600">
    Already have an account?{" "}
    <button
      type="button"
      onClick={() => {
        setShowModal(false);
        setShowLogin(true);
      }}
      className="text-orange-600 font-medium hover:underline"
    >
      Login here
    </button>
  </p>
</div>

          </form>
        </div>
      </div>

      {/* LOADER */}
      {sendingOtp && <FullScreenLoader text="Sending OTP..." />}

      {/* OTP MODAL */}
      {showOtpModal && (
        <OtpModal
          email={watch("email")}
          onClose={() => setShowOtpModal(false)}
          onVerify={handleVerifyOtp}
        />
      )}
    </>
  );
};

export default RegisterModal;
