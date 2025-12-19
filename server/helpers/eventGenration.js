// EVT-BRICS-SUMMIT-2026-03-20-001

import Event from '../models/eventModel.js';

export const generateEventId = async (eventName, startDate) => {
  const slugName = slugifyEventName(eventName);
  const date = new Date(startDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const dateKey = `${year}-${month}-${day}`;

  // Count existing events with same name + date
  const count = await Event.countDocuments({
    event_id: { $regex: `^EVT-${slugName}-${dateKey}` }
  });

  const sequence = String(count + 1).padStart(3, '0');

  return `EVT-${slugName}-${dateKey}-${sequence}`;
};

export const slugifyEventName = (name) => {
  return name
    .toUpperCase()
    .trim()
    .replace(/[^A-Z0-9 ]/g, '')   // remove special chars
    .replace(/\s+/g, '-')         // spaces → hyphen
    .substring(0, 30);            // limit length
};
