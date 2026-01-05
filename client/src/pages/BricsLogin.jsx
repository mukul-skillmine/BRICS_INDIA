import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BricsHeader from "./BricsHeader";
import line_bar from "../assets/images/line_bar.svg";
import vector1 from "../assets/images/vector1.svg";
import vector2 from "../assets/images/vector2.svg";
import login_page_logo from "../assets/images/login_page_logo.svg";

// Validation schemas
const emailLoginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits").regex(/^[0-9]+$/, "OTP must contain only numbers"),
});

const BricsLogin = () => {
  const [step, setStep] = useState("email"); // 'email' or 'otp'
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

  // Email form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailLoginSchema),
    mode: "onChange",
  });

  const email = useWatch({
    control,
    name: "email",
  });

  // OTP form
  const {
    handleSubmit: handleOtpFormSubmit,
    setValue: setOtpValue,
    formState: { errors: otpErrors },
  } = useForm({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
  });

  const handleEmailSubmit = async (data) => {
    try {
      console.log("Email submitted:", data.email);
      // Here you would send OTP to email
      // const response = await fetch('/api/send-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: data.email })
      // });
      // if (response.ok) {
      setStep("otp");
      // }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    const otpString = newOtpValues.join("");
    setOtpValue("otp", otpString);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index}`);
      if (nextInput?.nextElementSibling) {
        nextInput.nextElementSibling.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      const currentInput = document.getElementById(`otp-${index}`);
      if (currentInput?.previousElementSibling) {
        currentInput.previousElementSibling.focus();
      }
    }
  };

  const handleOtpSubmit = async (data) => {
    try {
      console.log("OTP submitted:", data.otp);
      // Verify OTP and login
      // const response = await fetch('/api/verify-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, otp: data.otp })
      // });
      // if (response.ok) {
      //   // Redirect to dashboard
      // }
      alert("OTP verified successfully!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handleResendOtp = async () => {
    try {
      console.log("Resending OTP to:", email);
      // Resend OTP logic
      // const response = await fetch('/api/resend-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      setOtpValues(["", "", "", "", "", ""]);
      setOtpValue("otp", "");
      alert("OTP resent successfully!");
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setOtpValues(["", "", "", "", "", ""]);
    setOtpValue("otp", "");
  };

  return (
    <div className="bg-primary h-screen overflow-hidden relative">
      <div className="fixed top-4 w-full inset-x-0 max-w-[1440px] left-1/2 -translate-x-1/2 z-50">
        <BricsHeader />
      </div>

      <div className="bg-primary min-h-screen bg-gradient-to-br flex items-center justify-center p-4 bg-gradient-orange">
        {/* Main Container */}
        <div className="relative w-full max-w-6xl">
          {/* Welcome Card */}
          <div className="w-full mx-auto text-center my-6 relative">
            <h3 className="text-5xl text-[#101828]">
              Welcome BRICS India Team
            </h3>
            <p className="my-2 text-[#4A5565]">Admin Dashboard</p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
              <img src={vector1} alt="" className="w-[144px] h-[144px]" />
            </div>
          </div>

          {/* Login Form Card */}
          <div className="bg-white rounded-2xl shadow-md max-w-[636px] max-h-[486px] p-8 mx-auto  border-[#F58220] border-[1px]">
            {step === "email" ? (
              <>
                <img
                  src={login_page_logo}
                  alt=""
                  className="w-[294px] h-[70px] mx-auto my-6"
                />
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-6 mt-12">
                  Login to Your Dashboard
                </h3>

                <form
                  onSubmit={handleSubmit(handleEmailSubmit)}
                  className="max-w-[416px] mx-auto"
                >
                  <div className="mb-6">
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email ID"
                      {...register("email")}
                      className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <button
                    disabled={!email}
                    type="submit"
                    className={`btn-primary ${
                      email
                        ? "btn-primary-enabled"
                        : "btn-primary-disabled"
                    }`}
                  >
                    Get OTP
                  </button>
                </form>
              </>
            ) : (
              <div className=" max-w-[370px] mx-auto">
              <img
                  src={login_page_logo}
                  alt="logo"
                  className="max-w-[294px] h-[70px] mx-auto mt-6"
                />
                <p className="text-center text-gray-600 text-sm  max-w-[370px] mx-auto mt-12 mb-6">
                  We've sent a 6-digit OTP to your email ID. Please enter it
                  below to proceed.
                </p>

                <form onSubmit={handleOtpFormSubmit(handleOtpSubmit)}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2 ">
                      Enter OTP
                    </label>
                    <div className="flex gap-2 justify-between mb-2 ">
                      {[...Array(6)].map((_, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength="1"
                          value={otpValues[index]}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-11 h-11 md:w-12 md:h-12 text-center border-2 border-gray-300 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      ))}
                    </div>
                    {otpErrors.otp && (
                      <p className="text-red-500 text-xs text-center mt-1">
                        {otpErrors.otp.message}
                      </p>
                    )}
                    {/* <p className="text-center text-sm text-gray-600 mb-4">
                      Received OTP on email?
                    </p> */}
                     <button
                    type="button"
                    onClick={handleResendOtp}
                    className="w-full text-end mt-4 text-[#1F4788] hover:text-blue-700 text-sm transition-colors"
                  >
                    Resend OTP
                  </button>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={handleBackToEmail}
                      className="  bg-white hover:bg-gray-50 text-[#1F4788] px-8
                     py-2 rounded-lg border-[1px]  border-[#1F4788] transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={otpValues.join("").length !== 6}
                      className={` px-8 py-2 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] underline ${
                        otpValues.join("").length === 6
                          ? "btn-primary-enabled text-white"
                          : "bg-gray-400 text-white cursor-not-allowed"
                      }`}
                    >
                      Continue
                    </button>
                  </div>

                 
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 rotate-[100deg] max-w-[230px] hidden md:block">
        <img src={vector2} alt="" className="" />
      </div>
      <div className="absolute right-0 bottom-0 max-w-[330px] hidden md:block">
        <img src={vector2} alt="" className="w-full" />
      </div>

      <div className="w-full absolute bottom-0">
        <img src={line_bar} alt="" className="w-full" />
      </div>
    </div>
  );
};

export default BricsLogin;