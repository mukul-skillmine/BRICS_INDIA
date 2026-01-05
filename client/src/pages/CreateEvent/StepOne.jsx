import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const stepOneSchema = z.object({
  eventMode: z.enum(['in-person', 'virtual', 'hybrid'], {
    required_error: 'Please select event mode',
  }),
  eventName: z.string().min(3, 'Event name must be at least 3 characters'),
  eventCategory: z.string().min(1, 'Event category is required'),
  startDate: z.string().min(1, 'Start date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endDate: z.string().min(1, 'End date is required'),
  endTime: z.string().min(1, 'End time is required'),
  sourceLanguage: z.string().min(1, 'Source language is required'),
  dpdpConsent: z.boolean().refine((val) => val === true, {
    message: 'DPDP consent is required',
  }),
  dataRetentionPolicy: z.string().min(1, 'Data retention policy is required'),
});

const StepOne = ({ onNext, defaultValues }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stepOneSchema),
    defaultValues: defaultValues || {
      dpdpConsent: false,
      dataRetentionPolicy: '90',
    },
  });

  const selectedMode = watch('eventMode');

  const eventModes = [
    {
      id: 'in-person',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'In-Person',
      description: 'Conduct an event at a physical venue',
    },
    {
      id: 'virtual',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Virtual',
      description: 'Host a digital event for remote participants',
    },
    {
      id: 'hybrid',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      label: 'Hybrid',
      description: 'Combine in-person & remote participation',
    },
  ];

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      {/* Event Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {eventModes.map((mode) => (
          <label
            key={mode.id}
            className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all hover:border-blue-400 ${
              selectedMode === mode.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <input
              type="radio"
              value={mode.id}
              {...register('eventMode')}
              className="sr-only"
            />
            <div className="flex flex-col items-center text-center gap-3">
              <div
                className={`transition-colors ${
                  selectedMode === mode.id ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                {mode.icon}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{mode.label}</div>
                <div className="text-xs text-gray-600 mt-1">{mode.description}</div>
              </div>
            </div>
            {selectedMode === mode.id && (
              <div className="absolute top-3 right-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </label>
        ))}
      </div>
      {errors.eventMode && (
        <p className="text-red-500 text-sm">{errors.eventMode.message}</p>
      )}

      {/* Event Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h3>

        <div className="space-y-4">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="BRICS Finance Ministers' Meeting 2026"
              {...register('eventName')}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.eventName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.eventName && (
              <p className="text-red-500 text-xs mt-1">{errors.eventName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Category <span className="text-red-500">*</span>
              </label>
              <select
                {...register('eventCategory')}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.eventCategory ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select category</option>
                <option value="Main Summit">Main Summit</option>
                <option value="Conference">Conference</option>
                <option value="Workshop">Workshop</option>
                <option value="Meeting">Meeting</option>
              </select>
              {errors.eventCategory && (
                <p className="text-red-500 text-xs mt-1">{errors.eventCategory.message}</p>
              )}
            </div>

            {/* Event Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="EV12026-747"
                  readOnly
                  value="EV12026-747"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
                <div className="absolute right-3 top-3 text-xs text-gray-500">
                  Auto-generated unique code
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register('startDate')}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.startDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>
              )}
            </div>

            {/* Start Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                {...register('startTime')}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.startTime ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.startTime && (
                <p className="text-red-500 text-xs mt-1">{errors.startTime.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register('endDate')}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.endDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.endDate && (
                <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>
              )}
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                {...register('endTime')}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.endTime ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.endTime && (
                <p className="text-red-500 text-xs mt-1">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          {/* Source Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Source Language <span className="text-red-500">*</span>
            </label>
            <select
              {...register('sourceLanguage')}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.sourceLanguage ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Chinese">Chinese</option>
              <option value="Russian">Russian</option>
              <option value="Portuguese">Portuguese</option>
            </select>
            {errors.sourceLanguage && (
              <p className="text-red-500 text-xs mt-1">{errors.sourceLanguage.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Data Protection & Compliance */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex items-start gap-3 mb-4">
          <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Data Protection & Compliance</h3>
            <p className="text-sm text-gray-600 mt-1">Ensure event data handling complies with regulations</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* DPDP Consent */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              {...register('dpdpConsent')}
              className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-900">
                DPDP Consent <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-600 mt-1">
                I confirm this event will collect data lawfully and transparently
              </p>
            </div>
          </div>
          {errors.dpdpConsent && (
            <p className="text-red-500 text-xs">{errors.dpdpConsent.message}</p>
          )}

          {/* Data Retention Policy */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Retention Policy <span className="text-red-500">*</span>
            </label>
            <select
              {...register('dataRetentionPolicy')}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.dataRetentionPolicy ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">365 days</option>
              <option value="730">2 years</option>
            </select>
            {errors.dataRetentionPolicy && (
              <p className="text-red-500 text-xs mt-1">{errors.dataRetentionPolicy.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
        >
          Continue
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default StepOne;