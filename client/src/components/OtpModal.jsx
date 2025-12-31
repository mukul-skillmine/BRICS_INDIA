import React, { useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import useEscapeKey from "../hooks/useEscapeKey";

const OtpModal = ({ email, onClose, onVerify }) => {

useEscapeKey(onClose);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) return;
    onVerify(finalOtp);
  };

  return (
    // <div className="fixed inset-0 z-[9999] bg-gray-500/60 flex items-center justify-center text-black">
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[12000]">
      <div className="bg-white w-[440px] rounded-2xl p-6 relative shadow-xl">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl text-gray-500 hover:text-gray-700"
        >
          <IoCloseOutline />
        </button>

        {/* TITLE */}
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Verify Email
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          An OTP has been sent to{" "}
          <span className="font-medium text-gray-800">{email}</span>.
        </p>

        {/* OTP INPUTS */}
        <div className="flex justify-between gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center
  border border-gray-300 rounded-lg
  text-lg font-semibold
  text-black caret-black
  bg-white
  focus:outline-none
  focus:ring-2 focus:ring-orange-500
  focus:border-orange-500"
            />
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-500 text-white
                       hover:bg-gray-600 transition"
          >
            Close
          </button>

          <button
            onClick={handleVerify}
            className="px-5 py-2 rounded-md bg-orange-500 text-white
                       hover:bg-orange-600 transition font-medium"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
