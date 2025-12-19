import { generateEventId } from '../helpers/eventGenration.js';
import * as EventManager from '../managers/eventManager.js';

/**
 * Format date as "22 March 2025"
 */
const formatDate = (date) => {
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
};

/**
 * ==================== CREATE EVENT ====================
 */
export const createEvent = async (req, res) => {
  try {
    const params = req.body.payload;
    if (!params) return res.status(406).json({ success: false, message: 'Request data missing!' });

    // Required fields validation
    if (!params.name || !params.start_date || !params.end_date || !params.start_time || !params.end_time || !params.capacity) {
      return res.status(406).json({ success: false, message: 'Required fields missing!' });
    }

    if (new Date(params.start_date) > new Date(params.end_date)) {
      return res.status(422).json({ success: false, message: 'End date must be equal or after start date' });
    }

    const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(params.start_time) || !timeRegex.test(params.end_time)) {
      return res.status(422).json({ success: false, message: 'Time must be in HH:mm format' });
    }

    if (params.capacity < 1) {
      return res.status(422).json({ success: false, message: 'Capacity must be at least 1' });
    }

    // Generate Event ID
    const eventId = await generateEventId(params.name, params.start_date);

    let start_date = formatDate(new Date(params.start_date));
    let end_date = formatDate(new Date(params.end_date));

    const payload = {
      event_id: eventId,
      name: params.name.trim(),
      description: params.description || '',
      start_date: start_date,
      end_date: end_date,
      start_time: params.start_time,
      end_time: params.end_time,
      location: params.location || '',
      capacity: params.capacity,
      is_active: params.is_active ?? true,
      registration_open: params.registration_open ?? true,
      created_by: params.created_by,
      event_type: params.event_type || 'In-person',
      source_language: params.source_language || 'English'
    };

    await EventManager.createEvent(payload);

    return res.status(200).json({ success: true, message: 'Event created successfully', event_id: eventId });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * ==================== UPDATE EVENT ====================
 */
export const updateEvent = async (req, res) => {
  try {
    const params = req.body.payload;
    if (!params) return res.status(406).json({ success: false, message: 'Request data missing!' });
    if (!params.id) return res.status(406).json({ success: false, message: 'Event ID is required' });

    const existingEvent = await EventManager.getEventDetails({ _id: params.id });
    if (!existingEvent) return res.status(404).json({ success: false, message: 'Event not found' });

    const payload = {
      name: params.name ?? existingEvent.name,
      description: params.description ?? existingEvent.description,
      start_date: params.start_date ? new Date(params.start_date) : existingEvent.start_date,
      end_date: params.end_date ? new Date(params.end_date) : existingEvent.end_date,
      start_time: params.start_time ?? existingEvent.start_time,
      end_time: params.end_time ?? existingEvent.end_time,
      location: params.location ?? existingEvent.location,
      capacity: params.capacity ?? existingEvent.capacity,
      is_active: params.is_active ?? existingEvent.is_active,
      registration_open: params.registration_open ?? existingEvent.registration_open,
      event_type: params.event_type ?? existingEvent.event_type,
      source_language: params.source_language ?? existingEvent.source_language
    };

    await EventManager.updateEvent({ _id: params.id }, payload);

    return res.status(200).json({ success: true, message: 'Event updated successfully' });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * ==================== DELETE EVENT ====================
 */
export const deleteEvent = async (req, res) => {
  try {
    const params = req.body.payload;
    if (!params) return res.status(406).json({ success: false, message: 'Request data missing!' });
    if (!params.id) return res.status(406).json({ success: false, message: 'Event ID is required' });

    const existingEvent = await EventManager.getEventDetails({ _id: params.id });
    if (!existingEvent) return res.status(404).json({ success: false, message: 'Event not found' });

    await EventManager.deleteEvent({ _id: params.id });

    return res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * ==================== LIST EVENTS ====================
 */
export const getEventList = async (req, res) => {
  try {
    const events = await EventManager.getEventList({ is_active: true });

    // Format dates
    const formattedEvents = events.map(event => ({
      ...event._doc,
      start_date_formatted: formatDate(event.start_date),
      end_date_formatted: formatDate(event.end_date)
    }));

    return res.status(200).json({ success: true, eventList: formattedEvents });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * ==================== EVENT DETAILS ====================
 */
export const getEventDetail = async (req, res) => {
  try {
    const params = req.query.payload ? JSON.parse(req.query.payload) : null;
    if (!params) return res.status(406).json({ success: false, message: 'Request data missing!' });
    if (!params.id) return res.status(406).json({ success: false, message: 'Event ID is required' });

    const event = await EventManager.getEventDetails({ _id: params.id });
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    // Format dates
    const formattedEvent = {
      ...event._doc,
      start_date_formatted: formatDate(event.start_date),
      end_date_formatted: formatDate(event.end_date)
    };

    return res.status(200).json({ success: true, data: formattedEvent });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * ==================== BULK CREATE EVENTS ====================
 */
export const createEventsBulk = async (req, res) => {
  try {
    const { payload } = req.body;
    if (!payload || !Array.isArray(payload) || payload.length === 0) {
      return res.status(406).json({ success: false, message: 'Payload must be a non-empty array' });
    }

    const eventsToCreate = [];

    for (const params of payload) {
      if (!params.name || !params.start_date || !params.end_date || !params.start_time || !params.end_time || !params.capacity) {
        return res.status(406).json({ success: false, message: `Required fields missing in event: ${params.name}` });
      }

      let startDate = new Date(params.start_date);
      let endDate = new Date(params.end_date);

      if (startDate > endDate) {
        return res.status(422).json({ success: false, message: `End date must be equal or after start date for event: ${params.name}` });
      }

      const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
      if (!timeRegex.test(params.start_time) || !timeRegex.test(params.end_time)) {
        return res.status(422).json({ success: false, message: `Invalid time format for event: ${params.name}` });
      }

      if (params.capacity < 1) {
        return res.status(422).json({ success: false, message: `Capacity must be at least 1 for event: ${params.name}` });
      }

      const eventId = await generateEventId(params.name, params.start_date);

      startDate = formatDate(new Date(params.start_date));
      endDate = formatDate(new Date(params.end_date));
      
      eventsToCreate.push({
        event_id: eventId,
        name: params.name.trim(),
        description: params.description || '',
        start_date: startDate,
        end_date: endDate,
        start_time: params.start_time,
        end_time: params.end_time,
        location: params.location || '',
        capacity: params.capacity,
        is_active: params.is_active ?? true,
        registration_open: params.registration_open ?? true,
        created_by: params.created_by,
        event_type: params.event_type || 'In-person',
        source_language: params.source_language || 'English'
      });
    }

    await EventManager.bulkCreateEvent(eventsToCreate);

    return res.status(200).json({ success: true, message: 'Events created successfully' });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
