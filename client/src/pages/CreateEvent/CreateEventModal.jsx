import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

// Validation schemas for each step
const stepOneSchema = z.object({
  eventMode: z.enum(['in-person', 'virtual', 'hybrid'], {
    required_error: 'Please select event mode',
  }),
  eventName: z.string().min(3, 'Event name must be at least 3 characters'),
  eventCategory: z.string().min(1, 'Event category is required'),
  eventCode: z.string().optional(),
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

const stepTwoSchema = z.object({
  country: z.string().optional(),
  city: z.string().optional(),
  venue: z.string().optional(),
  virtualLink: z.string().url('Invalid URL').optional().or(z.literal('')),
});

const stepThreeSchema = z.object({
  managerEmail: z.string().email('Invalid email address'),
});

const CreateEventModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [eventData, setEventData] = useState({});

  const form = useForm({
    mode: 'onChange',
  });

  const steps = [
    { id: 1, label: 'Details' },
    { id: 2, label: 'Location' },
    { id: 3, label: 'Manager' },
    { id: 4, label: 'Review' },
  ];

  const handleNext = (data) => {
    setEventData((prev) => ({ ...prev, ...data }));
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveAsDraft = () => {
    console.log('Saving as draft:', eventData);
    // API call to save draft
    alert('Saved as draft!');
  };

  const handleFinalSubmit = async () => {
    console.log('Final submission:', eventData);
    // API call to create event
    try {
      // await fetch('/api/events', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(eventData)
      // });
      alert('Event created successfully!');
      onClose();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-99 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-center gap-2 mb-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h2 className="text-2xl font-bold">Create New Event</h2>
          </div>
          <p className="text-sm text-white/90">Multi-step guided event setup</p>

          {/* Progress Bar */}
          <div className="mt-6 flex items-center justify-between relative">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                      currentStep >= step.id
                        ? 'bg-white text-blue-600'
                        : 'bg-white/30 text-white'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className="text-xs mt-2 text-white/90 font-medium">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-all ${
                      currentStep > step.id ? 'bg-white' : 'bg-white/30'
                    }`}
                    style={{ marginTop: '-20px' }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Security Badge */}
          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secure, DPDP-Compliant</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentStep === 1 && (
            <StepOne onNext={handleNext} defaultValues={eventData} />
          )}
          {currentStep === 2 && (
            <StepTwo onNext={handleNext} defaultValues={eventData} eventMode={eventData.eventMode} />
          )}
          {currentStep === 3 && (
            <StepThree onNext={handleNext} defaultValues={eventData} />
          )}
          {currentStep === 4 && (
            <StepFour eventData={eventData} onSubmit={handleFinalSubmit} />
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 flex items-center justify-between bg-gray-50">
          {currentStep > 1 && currentStep < 4 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}
          {currentStep === 4 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}
          <div className="flex items-center gap-3 ml-auto">
            {currentStep < 4 && (
              <button
                onClick={handleSaveAsDraft}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Save as Draft
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;