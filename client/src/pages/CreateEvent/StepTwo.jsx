import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const stepTwoSchema = z.object({
  country: z.string().optional(),
  city: z.string().optional(),
  venue: z.string().optional(),
  virtualLink: z.string().url('Invalid URL').optional().or(z.literal('')),
});

const StepTwo = ({ onNext, defaultValues, eventMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: defaultValues || {},
  });

  const showPhysical = eventMode === 'in-person' || eventMode === 'hybrid';
  const showVirtual = eventMode === 'virtual' || eventMode === 'hybrid';

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      {/* Physical Venue Details */}
      {showPhysical && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-4">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Physical Venue Details</h3>
              <p className="text-sm text-gray-600 mt-1">Provide location information for in-person attendees</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('country')}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.country ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select country</option>
                  <option value="India">India</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Russia">Russia</option>
                  <option value="China">China</option>
                  <option value="South Africa">South Africa</option>
                </select>
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="New Delhi"
                  {...register('city')}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                )}
              </div>
            </div>

            {/* Venue */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Venue (Optional)
              </label>
              <input
                type="text"
                placeholder="Bharat Mandapam"
                {...register('venue')}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
        </div>
      )}

      {/* Virtual Event Details */}
      {showVirtual && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-4">
            <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Virtual Event Details</h3>
              <p className="text-sm text-gray-600 mt-1">Add meeting link for remote participants</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Virtual Link <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              placeholder="https://zoom.us/j/123456789"
              {...register('virtualLink')}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.virtualLink ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.virtualLink && (
              <p className="text-red-500 text-xs mt-1">{errors.virtualLink.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Supported platforms: Zoom, Microsoft Teams, Google Meet, Webex
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
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

export default StepTwo;