import React from 'react';

const StepFour = ({ eventData, onSubmit }) => {
  const InfoRow = ({ label, value, icon }) => (
    <div className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2">
        {icon && <span className="text-gray-400">{icon}</span>}
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className="text-sm font-medium text-gray-900 text-right">{value || 'N/A'}</span>
    </div>
  );

  const Section = ({ title, icon, children, onEdit }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        <button
          onClick={onEdit}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Edit
        </button>
      </div>
      {children}
    </div>
  );

  const getModeDisplay = () => {
    const modes = {
      'in-person': 'In-Person',
      'virtual': 'Virtual',
      'hybrid': 'Hybrid'
    };
    return modes[eventData.eventMode] || eventData.eventMode;
  };

  return (
    <div className="space-y-6">
      {/* Draft Status Badge */}
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
          Draft Status
        </span>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Review Event Details</h2>
        <p className="text-gray-600 mt-2">Verify all information before publishing</p>
      </div>

      {/* Event Information */}
      <Section
        title="Event Information"
        icon={
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
      >
        <div className="space-y-0">
          <InfoRow label="Name" value={eventData.eventName} />
          <InfoRow label="Code" value={eventData.eventCode || 'EV12026-747'} />
          <InfoRow label="Mode" value={getModeDisplay()} />
          <InfoRow label="Category" value={eventData.eventCategory} />
          <InfoRow label="Language" value={eventData.sourceLanguage} />
        </div>
      </Section>

      {/* Location & Mode */}
      <Section
        title="Location & Mode"
        icon={
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        }
      >
        <div className="space-y-0">
          {eventData.country && <InfoRow label="Country" value={eventData.country} />}
          {eventData.city && <InfoRow label="City" value={eventData.city} />}
          {eventData.virtualLink && (
            <InfoRow 
              label="Virtual Link" 
              value={
                <a href={eventData.virtualLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {eventData.virtualLink}
                </a>
              } 
            />
          )}
        </div>
      </Section>

      {/* Event Manager */}
      <Section
        title="Event Manager"
        icon={
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      >
        <div className="space-y-0">
          <InfoRow label="Email" value={eventData.managerEmail} />
          <InfoRow 
            label="Status" 
            value={
              <span className="flex items-center gap-1 text-green-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified ✓
              </span>
            } 
          />
        </div>
      </Section>

      {/* Compliance */}
      <Section
        title="Compliance"
        icon={
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        }
      >
        <div className="space-y-0">
          <InfoRow 
            label="DPDP Consent" 
            value={
              <span className="text-green-600 flex items-center gap-1">
                Confirmed ✓
              </span>
            } 
          />
          <InfoRow label="Data Retention" value={`${eventData.dataRetentionPolicy} Days`} />
        </div>
      </Section>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => {
            console.log('Saving as draft:', eventData);
            alert('Saved as draft!');
          }}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
        >
          Save as Draft
        </button>
        <button
          onClick={onSubmit}
          className="px-8 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Save the Event
        </button>
      </div>
    </div>
  );
};

export default StepFour;
