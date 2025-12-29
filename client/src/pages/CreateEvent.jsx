import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoCloseOutline } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import calender from "../assets/images/calendar.svg";
import axios from "axios";
import { toast } from "react-toastify";
import OtpModal from "../components/OtpModal";

const CreateEvent = ({ setShowModal }) => {
  /* -------------------- LOCAL STATE -------------------- */
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  /* -------------------- VALIDATION SCHEMA -------------------- */
  const createEventSchema = z.object({
    mode: z.enum(["In-person", "Virtual", "Hybrid"]),
    eventName: z.string().min(3, "Event name is required"),
    eventType: z.string().min(1, "Event type is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    startDate: z.string().min(1, "Start date required"),
    startTime: z.string().min(1, "Start time required"),
    endDate: z.string().min(1, "End date required"),
    endTime: z.string().min(1, "End time required"),
    language: z.string().min(1, "Language is required"),
  });

  /* -------------------- FORM -------------------- */
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createEventSchema),
    mode: "onChange",
    defaultValues: {
      mode: "Virtual",
    },
  });

  const emailValue = useWatch({ control, name: "email" });
  const selectedMode = watch("mode");

  /* -------------------- EMAIL OTP FLOW -------------------- */
  const handleVerifyEmail = async () => {
    const email = watch("email");
    if (!email) return;

    try {
      setSendingOtp(true);

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/otp/send`,
        { email }
      );

      toast.success("OTP sent successfully");

      setTimeout(() => {
        setShowOtpModal(true);
        setSendingOtp(false);
      }, 400);
    } catch (err) {
      setSendingOtp(false);
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (otp) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/otp/verify`,
        { email: watch("email"), otp }
      );

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
        name: data.eventName,
        start_date: data.startDate,
        end_date: data.endDate,
        start_time: data.startTime,
        end_time: data.endTime,
        event_type: data.mode,
        source_language: data.language,
      };

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/event/create`,
        { payload }
      );

      toast.success("Event created successfully!");
      setShowModal(false);
    } catch (err) {
      toast.error("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- STATIC DATA -------------------- */
  const options = [
    {
      id: "Virtual",
      title: "Online Event",
      description: "Host your event virtually",
      icon: <FaUser className="text-blue-600 text-2xl" />,
    },
    {
      id: "In-person",
      title: "In-Person Event",
      description: "Meet at a physical location",
      icon: <FaMapMarkerAlt className="text-green-600 text-2xl" />,
    },
    {
      id: "Hybrid",
      title: "Hybrid Event",
      description: "Online + in-person attendees",
      icon: <FaCalendarAlt className="text-purple-600 text-2xl" />,
    },
  ];

  const eventOptions = [
    { value: "brics-summit-india-2025", label: "BRICS Summit India 2025" },
    { value: "brics-cultural-festival", label: "BRICS Cultural Festival" },
    { value: "india-bilateral-meeting", label: "India Bilateral Meetings" },
    { value: "brics-economic-forum", label: "BRICS Economic Forum" },
    { value: "brics-youth-conference", label: "BRICS Youth Conference" },
  ];

  const bricsLanguages = [
    { value: "hindi", label: "Hindi (India)" },
    { value: "english", label: "English (India)" },
    { value: "bengali", label: "Bengali (India)" },
    { value: "marathi", label: "Marathi (India)" },
  ];

  const isEmailInvalid = !emailValue || !!errors.email;

  /* -------------------- UI -------------------- */
  return (
    <>
      <div className="w-full h-screen bg-gray-500/60 fixed inset-0 flex items-center justify-center">
        <div className="w-4/5 bg-white rounded-xl">
          {/* HEADER */}
          <div className="flex justify-between px-8 py-2 border-b">
            <p className="text-lg font-semibold">Create Event</p>
            <IoCloseOutline
              onClick={() => setShowModal(false)}
              className="text-xl cursor-pointer"
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              {/* LEFT */}
              <div className="p-8 w-[75%]">
                {/* EVENT MODE */}
                <div className="grid grid-cols-3 gap-4">
                  {options.map((option) => (
                    <label
                      key={option.id}
                      className={`border p-4 rounded cursor-pointer flex items-center gap-4 ${
                        selectedMode === option.id
                          ? "border-orange-600 bg-orange-50"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        value={option.id}
                        className="hidden"
                        {...register("mode")}
                      />
                      {option.icon}
                      <div>
                        <p className="font-medium">{option.title}</p>
                        <p className="text-sm">{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* EVENT NAME */}
                <div className="mt-4">
                  <label className="text-xs">Event Name *</label>
                  <input {...register("eventName")} className="input-field" />
                  {errors.eventName && (
                    <p className="text-red-500 text-xs">
                      {errors.eventName.message}
                    </p>
                  )}
                </div>

                {/* EVENT TYPE */}
                <div className="mt-4">
                  <label className="text-xs">Event Type *</label>
                  <select {...register("eventType")} className="input-field">
                    <option value="">Select event</option>
                    {eventOptions.map((e) => (
                      <option key={e.value} value={e.value}>
                        {e.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* EMAIL */}
                <div className="mt-4">
                  <label className="text-xs">Email *</label>
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
                      disabled={emailVerified || isEmailInvalid || sendingOtp}
                      onClick={handleVerifyEmail}
                      className={`absolute right-2 top-1/2 -translate-y-1/2
                        flex items-center gap-1 text-sm
                        ${
                          sendingOtp
                            ? "text-gray-400 cursor-wait"
                            : emailVerified
                            ? "text-green-600"
                            : isEmailInvalid
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-600 hover:text-gray-700"
                        }`}
                    >
                      {sendingOtp ? (
                        "Sending..."
                      ) : emailVerified ? (
                        "Verified ✓"
                      ) : isEmailInvalid ? (
                        <>
                          
                          Verify
                        </>
                      ) : (
                        "Verify"
                      )}
                    </button>
                  </div>
                </div>

                {/* DATE & TIME */}
                <div className="flex gap-4 mt-4">
                  {["startDate", "startTime", "endDate", "endTime"].map(
                    (field, idx) => (
                      <div className="w-1/4" key={idx}>
                        <input
                          type={field.includes("Time") ? "time" : "date"}
                          {...register(field)}
                          className="input-field"
                        />
                        {errors[field] && (
                          <p className="text-red-500 text-xs">
                            {errors[field].message}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>

                {/* LANGUAGE */}
                <div className="mt-4">
                  <label className="text-xs">Language *</label>
                  <select {...register("language")} className="input-field">
                    <option value="">Select language</option>
                    {bricsLanguages.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* RIGHT */}
              <div className="w-[25%] bg-gray-100 p-6">
                <img src={calender} className="mx-auto mt-10" />
                <p className="text-sm text-gray-600 mt-4">
                  Fill basic details now. Add more info later.
                </p>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end p-4 border-t">
              <button
                type="submit"
                disabled={!emailVerified || loading}
                className="bg-orange-500 text-white px-4 py-2 rounded"
              >
                {loading ? "Loading..." : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* LOADER */}
      {sendingOtp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white px-6 py-4 rounded-xl flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Sending OTP...</span>
          </div>
        </div>
      )}

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

export default CreateEvent;
