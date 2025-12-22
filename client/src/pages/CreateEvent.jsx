import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoCloseOutline } from "react-icons/io5";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import calender from '../assets/images/calendar.svg'
import axios from 'axios'
import { toast } from "react-toastify";

const CreateEvent = ({ setShowModal }) => {
  const createEventSchema = z.object({
    mode: z.enum(['In-person', 'Virtual', 'Hybrid']),
    eventName: z.string().min(3, "Event name is required"),
    eventType: z.string().min(1, "Event type is required"),
    startDate: z.string().min(1, "Start date required"),
    startTime: z.string().min(1, "Start time required"),
    endDate: z.string().min(1, "End date required"),
    endTime: z.string().min(1, "End time required"),
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
      mode: "Virtual",
    },
  });

  const[loading,setLoading] = useState(false);

  const selected = watch("mode");
  console.log(`${import.meta.env.VITE_BASE_URL}`)
  const onSubmit = async(data) => {
    setLoading(true);
    try{
       console.log("✅ FORM DATA:", data);

        let mydata = {
          name: data.eventName,
          // description: params.description || '',
          start_date: data.startDate,
          end_date: data.endDate,
          start_time: data.startTime,
          end_time: data.endTime,
          // location: params.location || '',
          // capacity: params.capacity,
          // is_active: params.is_active ?? true,
          // registration_open: params.registration_open ?? true,
          // created_by: params.created_by,
          event_type: data.mode || 'In-person',
          source_language: data.language || 'English'
        };
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/event/create`,{payload :mydata}); 
        console.log(response)
        setShowModal(false);
        setLoading(false);
        toast.success("Event Create Successfully!");
    }catch(error){
        console.log(error.message)
    }
    finally{
      setLoading(false)
    }
  };

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
    { value: "telugu", label: "Telugu (India)" },
    { value: "tamil", label: "Tamil (India)" },
    { value: "gujarati", label: "Gujarati (India)" },
    { value: "portuguese", label: "Portuguese (Brazil)" },
    { value: "russian", label: "Russian (Russia)" },
    { value: "chinese", label: "Chinese (China)" },
    { value: "arabic", label: "Arabic (South Africa)" },
    { value: "zulu", label: "Zulu (South Africa)" },
  ];


  return (
    <div className="container w-full h-screen bg-gray-500/60 fixed inset-0 flex items-center justify-center">
      <div className="w-4/5 bg-white rounded-xl">
        <div className="flex justify-between px-8 py-2 items-center  border-b-[1px]">
          <p className="text-lg font-semibold">Create Event</p>
          <IoCloseOutline
            onClick={() => setShowModal(false)}
            className="text-xl cursor-pointer hover:text-2xl transition-all duration-200 ease-out "
          />
        </div>

        <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
            <div className="p-8 w-[75%]">
          {/* EVENT MODE */}
          <div className="grid grid-cols-3 gap-4">
            {options.map((option) => (
              <label
                key={option.id}
                className={`border p-4 rounded cursor-pointer flex items-center gap-4 ${
                  selected === option.id
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
                  <p className="text-md font-medium">{option.title}</p>
                  <p className="text-sm">{option.description}</p>
                </div>
              </label>
            ))}
          </div>

          {/* EVENT NAME */}
          <div className="mt-4">
            <label className="text-xs text-gray-800">Event Name <span className="text-red-500 font-bold">*</span></label>
            <input
              {...register("eventName")}
              className="input-field"
            />
            {errors.eventName && (
              <p className="text-red-500 text-xs">{errors.eventName.message}</p>
            )}
          </div>

          {/* EVENT TYPE */}
          <div className="mt-4">
            <label className="text-xs text-gray-800">Event Type <span className="text-red-500 font-bold">*</span></label>
            <select
              {...register("eventType")}
              className="input-field"
            >
              <option value="" className="input-field">Select an event</option>
              {eventOptions.map((event) => {
                return (
                  <option value={event.value} key={event.value}>
                    {event.label}
                  </option>
                );
              })}
            </select>
            {errors.eventType && (
              <p className="text-red-500 text-xs">
                {errors.eventType.message}
              </p>
            )}
          </div>

          {/* DATE & TIME */}
            <div className="flex gap-4 justify-between items-start mt-4">

            <div className="flex flex-col w-1/4">
            <label htmlFor="start-date" className="text-xs text-gray-800"> Start Date<span className="text-red-500 font-bold">*</span> </label>
            <input type="date" {...register("startDate")} className="input-field" />
             {errors.startDate && (
              <p className="text-red-500 text-xs">{errors.startDate.message}</p>
            )}
            </div>

            <div className="flex flex-col w-1/4">
            <label htmlFor="start-time" className="text-xs text-gray-800"> Start Time<span className="text-red-500 font-bold">*</span> </label>
            <input type="time" {...register("startTime")} className="input-field" />
             {errors.startTime && (
              <p className="text-red-500 text-xs">{errors.startTime.message}</p>
            )}
            </div>

            <div className="flex flex-col w-1/4">
            <label htmlFor="end-date" className="text-xs text-gray-800"> End Date<span className="text-red-500 font-bold">*</span> </label>
            <input type="date" {...register("endDate")} className="input-field" />
             {errors.endDate && (
              <p className="text-red-500 text-xs">{errors.endDate.message}</p>
            )}
            </div>


            <div className="flex flex-col w-1/4">
            <label htmlFor="end-time" className="text-xs text-gray-800"> End Time<span className="text-red-500 font-bold">*</span> </label>
            <input type="time" {...register("endTime")} className="input-field" />
             {errors.endTime && (
              <p className="text-red-500 text-xs">{errors.endTime.message}</p>
            )}
            </div>
          </div>

          {/* LANGUAGE */}
          <div className="mt-4">
            <label className="text-xs text-gray-800">Language <span className="text-red-500 font-bold">*</span></label>
            <select
              {...register("language")}
              className="input-field"
            >
              <option value="">Choose a language</option>

              {
                bricsLanguages.map((language)=>(
                    <option value={language.value} key={language.value}>{language.label}</option>
                ))
              }
            </select>
            {errors.language && (
              <p className="text-red-500 text-xs">
                {errors.language.message}
              </p>
            )}
          </div>
          </div>

          <div className="w-[25%] min-h-full bg-gray-100 border-[1px] border-l px-6 items-center">

            <img src={calender} alt="calender" className="mt-16 mx-auto" />
            <h3 className="text-xl font-medium py-2">Create<br/> Your Event</h3>
            <p className="text-xs text-gray-600">Start creating your event by providing the basic details now and fill in what your event is all about later</p>
          </div>
          </div>

          {/* NEXT BUTTON */}
          <div className="flex justify-end bg-gray-100 py-2 gap-2 pr-8 rounded-bl-md rounded-br-md border-t">

          <button className="text-sm bg-white border-[1px] border-gray-400 rounded-md px-4 py-1 hover:border-gray-600 transition-all duration-200 ease-in-out"
           onClick={() => {
              setShowModal(false)}}
          >Cancel</button>
          <button
            type="submit"
            className="text-sm bg-orange-500 hover:bg-orange-600 transition-all duration-300 ease-in-out text-white px-4 py-1 rounded-md float-right"
            disabled={loading}
          > {loading ?"Loading..." : "Next"}
            
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
