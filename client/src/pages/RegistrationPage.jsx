import React, { useEffect, useState } from 'react';
import { useForm,useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import OtpModal from '../components/OtpModal';
import { toast } from 'react-toastify';
import FullScreenLoader from "../features/FullScreenLoader";
import BricsHeader from './BricsHeader';

// Zod validation schema
const registrationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.string().min(1, 'Gender is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  email: z.string().email('Invalid email address'),
  countryCode: z.string().min(1, 'Country code is required'),
  phoneNumber: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits')
    .regex(/^[0-9]+$/, 'Phone number must contain only digits'),
  country: z.string().min(1, 'Country is required'),
  photo: z.any().refine((files) => files?.length > 0, 'Photo is required')
});

const RegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showOtpModal,setShowOtpModal] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [canVerifyEmail, setCanVerifyEmail] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });
  const emailValue = useWatch({ control, name: "email" });

  /* ---------------- EMAIL VALIDATION WATCH ---------------- */
  useEffect(() => {
    const validateEmail = async () => {
      if (!emailValue || emailVerified) {
        setCanVerifyEmail(false);
        return;
      }
      const valid = await trigger("email");
      setCanVerifyEmail(valid);
    };

    validateEmail();
  }, [emailValue, trigger, emailVerified]);

  /* ---------------- RESET VERIFICATION IF EMAIL CHANGES ---------------- */
  useEffect(() => {
    if (!emailVerified) return;

    // If email changes after verification → reset
    setEmailVerified(false);
  }, [emailValue]);

  /* ---------------- OTP LOGIC ---------------- */
  const handleVerifyEmail = async () => {
    try {
      setSendingOtp(true);
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/otp/send`,
        { email: emailValue }
      );
      toast.success("OTP sent successfully");
      setShowOtpModal(true);
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (otp) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/otp/verify`,
        { email: emailValue, otp }
      );

      toast.success("Email verified successfully");
      setEmailVerified(true);
      setShowOtpModal(false);
    } catch {
      toast.error("Invalid OTP");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('photo', e.target.files);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    console.log("Working")
    const valid = await trigger();
    if (!valid) {
      toast.error("Please fill all mandatory fields");
      return;
    }

    if (!emailVerified) {
      toast.error("Please verify your email first");
      return;
    }

    console.log('Form submitted:', data);
    // Handle form submission and move to next step
    // setCurrentStep(2);
  };

  const onClose = ()=>{
    setShowOtpModal(false)
  }

  return (
    <div className="min-h-screen p-5 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full p-10 my-5">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-slate-800 mb-2">Registration Form</h1>
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">BRICS Summit 2026</h2>
          <p className="text-slate-600 text-base font-medium">16th - 20th February 2026</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center items-center gap-10 my-10 relative">
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-48 h-0.5 bg-slate-200 z-0"></div>

          <div className="flex flex-col items-center gap-2 relative z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-base transition-all ${
              currentStep === 1 ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-400'
            }`}>
              1
            </div>
            <span className={`text-sm font-medium ${
              currentStep === 1 ? 'text-slate-800 font-semibold' : 'text-slate-500'
            }`}>
              Personal Information
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 relative z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-base transition-all ${
              currentStep === 2 ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-400'
            }`}>
              2
            </div>
            <span className={`text-sm font-medium ${
              currentStep === 2 ? 'text-slate-800 font-semibold' : 'text-slate-500'
            }`}>
              Professional Details
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Section Header */}
          <div className="border-b-2 border-slate-200 pb-4 mb-8">
            <h3 className="text-lg font-semibold text-slate-800">Section 1: Personal Information</h3>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* First Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                First Name (as per Government ID/Passport) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter First Name"
                {...register('firstName')}
                className={`px-4 py-3 border rounded-lg text-sm text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent ${
                  errors.firstName ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs">{errors.firstName.message}</span>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter Last Name"
                {...register('lastName')}
                className={`px-4 py-3 border rounded-lg text-sm text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent ${
                  errors.lastName ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.lastName && (
                <span className="text-red-500 text-xs">{errors.lastName.message}</span>
              )}
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-2">
              <label htmlFor="gender" className="text-sm font-medium text-slate-700">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                {...register('gender')}
                className={`px-4 py-3 border rounded-lg text-sm text-slate-800 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent ${
                  errors.gender ? 'border-red-500' : 'border-slate-300'
                }`}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {errors.gender && (
                <span className="text-red-500 text-xs">{errors.gender.message}</span>
              )}
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-2">
              <label htmlFor="dateOfBirth" className="text-sm font-medium text-slate-700">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dateOfBirth"
                {...register('dateOfBirth')}
                className={`px-4 py-3 border rounded-lg text-sm text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent ${
                  errors.dateOfBirth ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.dateOfBirth && (
                <span className="text-red-500 text-xs">{errors.dateOfBirth.message}</span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Provide Your Email ID <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center justify-center gap-2 relative">
                <input
                  type="email"
                  id="email"
                  placeholder="Provide Email Id"
                  {...register('email')}
                  disabled={emailVerified}
                  className={`flex-1 px-4 py-3 border rounded-lg w-full text-sm text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  } ${emailVerified ? 'bg-slate-100 cursor-not-allowed' : ''} ${sendingOtp ? 'cursor-wait' : ''}`}
                />
                <button
                  onClick={handleVerifyEmail}
                  type="button"
                  disabled={!canVerifyEmail || emailVerified || sendingOtp}
                  className={`px-6 py-3 rounded-lg text-indigo-700 text-sm font-semibold hover:border-indigo-700 transition-all whitespace-nowrap absolute right-0 ${
                    !canVerifyEmail || emailVerified || sendingOtp 
                      ? 'text-slate-400 cursor-not-allowed' 
                      : 'hover:text-indigo-800'
                  } ${emailVerified ? 'text-green-600' : ''} ${sendingOtp ? 'text-slate-400' : ''}`}
                >
                  {sendingOtp ? 'Sending...' : emailVerified ? 'Verified ✓' : 'Verify'}
                </button>
              </div>
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email.message}</span>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phoneNumber" className="text-sm font-medium text-slate-700">
                Phone Number/Whatsapp Number <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  {...register('countryCode')}
                  className={`w-full sm:w-36 px-4 py-3 border rounded-lg text-sm text-slate-800 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent ${
                    errors.countryCode ? 'border-red-500' : 'border-slate-300'
                  }`}
                >
                  <option value="">Select</option>
                  <option value="+91">+91 (India)</option>
                  <option value="+1">+1 (USA)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+61">+61 (Australia)</option>
                  <option value="+86">+86 (China)</option>
                </select>
                <input
                  type="tel"
                  maxLength={10}
                  minLength={10}
                  id="phoneNumber"
                  placeholder="XXXXXXXXXX"
                  {...register('phoneNumber')}
                  className={`flex-1 px-4 py-3 border rounded-lg text-sm text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent ${
                    errors.phoneNumber ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
              </div>
              {(errors.countryCode || errors.phoneNumber) && (
                <span className="text-red-500 text-xs">
                  {errors.countryCode?.message || errors.phoneNumber?.message}
                </span>
              )}
            </div>

            {/* Country */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="country" className="text-sm font-medium text-slate-700">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                id="country"
                {...register('country')}
                className={`px-4 py-3 border rounded-lg text-sm text-slate-800 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent ${
                  errors.country ? 'border-red-500' : 'border-slate-300'
                }`}
              >
                <option value="">Select Country</option>
                <option value="india">India</option>
                <option value="usa">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
              </select>
              {errors.country && (
                <span className="text-red-500 text-xs">{errors.country.message}</span>
              )}
            </div>

            {/* Photo Upload */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700">
                Photo Upload (Dimension Should Be of a Passport Size "350 px x350px". Upload a clear photo with white background, wearing official or dark-colored clothes) <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-700 hover:bg-slate-50 transition-all cursor-pointer">
                <input
                  type="file"
                  id="photo"
                  accept=".jpg,.jpeg,.png"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <label htmlFor="photo" className="flex flex-col items-center gap-4 cursor-pointer">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-indigo-700">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.67 18.95L7.6 15.64C8.39 15.11 9.53 15.17 10.24 15.78L10.57 16.07C11.35 16.74 12.61 16.74 13.39 16.07L17.55 12.5C18.33 11.83 19.59 11.83 20.37 12.5L22 13.9" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-700 font-medium mb-1">
                      <strong>Choose a file or drag & drop it here</strong>
                    </p>
                    <p className="text-xs text-slate-500">JPG, JPEG, PNG format, up to 50MB (max 5 MB)</p>
                  </div>
                  <button
                    type="button" className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-indigo-700 hover:text-indigo-700 transition-all">
                    Browse File
                  </button>
                </label>
              </div>
              {photoPreview && (
                <div className="mt-4 flex justify-center">
                  <img src={photoPreview} alt="Preview" className="max-w-[200px] max-h-[200px] rounded-lg border-2 border-slate-300" />
                </div>
              )}
              {errors.photo && (
                <span className="text-red-500 text-xs">{errors.photo.message}</span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t border-slate-200 gap-4">
            <p className="text-xs text-slate-400 text-center md:text-left">
              Form provided by <a href="#" className="text-indigo-700 hover:underline">name</a> • <a href="#" className="text-indigo-700 hover:underline">Privacy Policy</a> • <a href="#" className="text-indigo-700 hover:underline">Terms of Service</a>
            </p>
            <button
              type="submit"
              disabled={!emailVerified}
              className={`w-full md:w-auto px-12 py-3 rounded-lg text-base font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all ${
                emailVerified 
                  ? 'bg-indigo-700 text-white hover:bg-indigo-800' 
                  : 'bg-slate-400 text-slate-200 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </form>

        {sendingOtp && <FullScreenLoader text="Sending OTP..." />}
        {
          showOtpModal && (
            <OtpModal onVerify={handleVerifyOtp} onClose={onClose} email={emailValue}/>
          )
        }
      </div>
    </div>
  );
};

export default RegistrationPage;