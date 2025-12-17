import * as EventManager from '../managers/eventManager.js';

/**
 * ==================== CREATE EVENT ====================
 */
export const createEvent = async (req, res) => {
  try {
    if (!req.body.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing!' });
    }

    const params = req.body.payload;

    if (!params.name || !params.start_time || !params.end_time || !params.capacity) {
      return res.status(406).json({ success: false, message: 'Required fields missing!' });
    }

    if (new Date(params.start_time) >= new Date(params.end_time)) {
      return res.status(422).json({ success: false, message: 'End time must be greater than start time' });
    }

    if (params.capacity < 1) {
      return res.status(422).json({ success: false, message: 'Capacity must be at least 1' });
    }

    const payload = {
      name: params.name.trim(),
      description: params.description || '',
      start_time: params.start_time,
      end_time: params.end_time,
      location: params.location || '',
      capacity: params.capacity,
      is_active: true,
      registration_open: true,
      created_by: params.created_by
    };

    await EventManager.createEvent(payload);

    res.status(200).json({ success: true, message: 'Event created successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * ==================== UPDATE EVENT ====================
 */
export const updateEvent = async (req, res) => {
  try {
    if (!req.body.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing!' });
    }

    const params = req.body.payload;

    if (!params.id) {
      return res.status(406).json({ success: false, message: 'Event ID is required' });
    }

    const existingEvent = await EventManager.getEventDetails({ _id: params.id });
    if (!existingEvent) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const payload = {
      name: params.name ?? existingEvent.name,
      description: params.description ?? existingEvent.description,
      start_time: params.start_time ?? existingEvent.start_time,
      end_time: params.end_time ?? existingEvent.end_time,
      location: params.location ?? existingEvent.location,
      capacity: params.capacity ?? existingEvent.capacity,
      is_active: params.is_active ?? existingEvent.is_active,
      registration_open: params.registration_open ?? existingEvent.registration_open
    };

    await EventManager.updateEvent({ _id: params.id }, payload);

    res.status(200).json({ success: true, message: 'Event updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * ==================== DELETE EVENT ====================
 */
export const deleteEvent = async (req, res) => {
  try {
    if (!req.body.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing!' });
    }

    const params = req.body.payload;

    if (!params.id) {
      return res.status(406).json({ success: false, message: 'Event ID is required' });
    }

    const existingEvent = await EventManager.getEventDetails({ _id: params.id });
    if (!existingEvent) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    await EventManager.deleteEvent({ _id: params.id });

    res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * ==================== LIST EVENTS ====================
 */
export const getEventList = async (req, res) => {
  try {
    const eventList = await EventManager.getEventList({ is_active: true });
    res.status(200).json({ success: true, eventList });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * ==================== EVENT DETAILS ====================
 */
export const getEventDetail = async (req, res) => {
  try {
    if (!req.query.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing!' });
    }

    const params = JSON.parse(req.query.payload);

    if (!params.id) {
      return res.status(406).json({ success: false, message: 'Event ID is required' });
    }

    const event = await EventManager.getEventDetails({ _id: params.id });
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
