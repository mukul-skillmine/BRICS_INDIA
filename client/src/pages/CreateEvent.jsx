import React from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoCloseOutline } from "react-icons/io5";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { z } from "zod";

const CreateEvent = ({ setShowModal }) => {
  // ✅ SAFETY CHECK (PREVENT WHITE SCREEN)
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  const createEventSchema = z.object({
    eventMode: z.enum(["online", "offline", "hybrid"]),
    eventName: z.string().min(1, "Event name is required"),
    eventType: z.string().min(1, "Event type is required"),
    startDate: z.string().min(1, "Start date is required"),
    startTime: z.string().min(1, "Start time is required"),
    endDate: z.string().min(1, "End date is required"),
    endTime: z.string().min(1, "End time is required"),
    language: z.string().min(1, "Language is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      eventMode: "online",
    },
  });

  const selected = watch("eventMode");

  const onSubmit = (data) => {
    console.log("✅ FORM DATA:", data);
  };

  return createPortal(
    <div className="fixed inset-0 z-[1300] flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setShowModal(false)}
      />

      {/* MODAL */}
      <div className="relative w-4/5 bg-white rounded-xl z-[1400] max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between p-4 border-b">
          <p className="text-lg font-semibold">Create Event</p>
          <IoCloseOutline
            onClick={() => setShowModal(false)}
            className="text-xl cursor-pointer"
          />
        </div>

        {/* FORM */}
        <form className="p-8" onSubmit={handleSubmit(onSubmit)}>
          {/* EVENT MODE */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: "online", title: "Online Event", icon: <FaUser /> },
              { id: "offline", title: "In-Person Event", icon: <FaMapMarkerAlt /> },
              { id: "hybrid", title: "Hybrid Event", icon: <FaCalendarAlt /> },
            ].map((option) => (
              <label
                key={option.id}
                className={`border p-4 rounded cursor-pointer flex items-center gap-2 ${
                  selected === option.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  value={option.id}
                  className="hidden"
                  {...register("eventMode")}
                  onChange={() => setValue("eventMode", option.id)}
                />
                {option.icon}
                <p>{option.title}</p>
              </label>
            ))}
          </div>

          {/* EVENT NAME */}
          <div className="mt-4">
            <label>Event Name *</label>
            <input
              {...register("eventName")}
              className="w-full border px-3 py-2 rounded mt-1"
            />
            {errors.eventName && (
              <p className="text-red-500 text-xs">
                {errors.eventName.message}
              </p>
            )}
          </div>

          {/* EVENT TYPE */}
          <div className="mt-4">
            <label>Event Type *</label>
            <select
              {...register("eventType")}
              className="w-full border px-3 py-2 rounded mt-1"
            >
              <option value="">Select</option>
              <option value="brics-summit-india-2025">
                BRICS Summit India 2025
              </option>
              <option value="brics-cultural-festival">
                BRICS Cultural Festival
              </option>
            </select>
            {errors.eventType && (
              <p className="text-red-500 text-xs">
                {errors.eventType.message}
              </p>
            )}
          </div>

          {/* DATE & TIME */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            <input
              type="date"
              {...register("startDate")}
              className="border px-3 py-2 rounded"
            />
            <input
              type="time"
              {...register("startTime")}
              className="border px-3 py-2 rounded"
            />
            <input
              type="date"
              {...register("endDate")}
              className="border px-3 py-2 rounded"
            />
            <input
              type="time"
              {...register("endTime")}
              className="border px-3 py-2 rounded"
            />
          </div>

          {/* LANGUAGE */}
          <div className="mt-4">
            <label>Language *</label>
            <select
              {...register("language")}
              className="w-full border px-3 py-2 rounded mt-1"
            >
              <option value="">Choose</option>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
            </select>
            {errors.language && (
              <p className="text-red-500 text-xs">
                {errors.language.message}
              </p>
            )}
          </div>

          {/* ACTION */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>,
    modalRoot
  );
};

export default CreateEvent;
