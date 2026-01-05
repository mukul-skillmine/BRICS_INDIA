
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const stepThreeSchema = z.object({
  managerEmail: z.string().email('Invalid email address'),
});

const StepThree = ({ onNext, defaultValues }) => {
  const [inviteSent, setInviteSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: defaultValues || {},
  });

  const email = watch('managerEmail');

  const handleSendInvite = () => {
    if (email && !errors.managerEmail) {
      // Simulate sending invite
      setTimeout(() => {
        setInviteSent(true);
      }, 500);
    }
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-start gap-3 mb-4">
          <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Assign Event Manager</h3>
            <p className="text-sm text-gray-600 mt-1">
              Event Manager will have full control over agenda, registration, logistics, and media.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="manager@brics2026.in"
                {...register('managerEmail')}
                className={`flex-1 px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.managerEmail ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={handleSendInvite}
                disabled={!email || errors.managerEmail || inviteSent}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                  inviteSent
                    ? 'bg-green-100 text-green-700 cursor-default'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } ${(!email || errors.managerEmail) && 'opacity-50 cursor-not-allowed'}`}
              >
                {inviteSent ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Sent
                  </span>
                ) : (
                  'Send Invite'
                )}
              </button>
            </div>
            {errors.managerEmail && (
              <p className="text-red-500 text-xs mt-1">{errors.managerEmail.message}</p>
            )}
          </div>

          {inviteSent && (
            <div className="bg-green-100 border border-green-300 rounded-lg p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-green-900">Invite Sent</p>
                <p className="text-xs text-green-700 mt-1">{email}</p>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-blue-900">
                <p className="font-medium">Manager Permissions Include:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
                  <li>Manage event agenda and schedule</li>
                  <li>Handle registrations and attendee data</li>
                  <li>Coordinate logistics and resources</li>
                  <li>Upload and manage media content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default StepThree;