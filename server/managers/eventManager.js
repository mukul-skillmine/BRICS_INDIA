import Event from '../models/eventModel.js';

// ==================== CREATE EVENT ====================
export const createEvent = async (payload) => {
  try {
    const result = await Event.create(payload);
    return result.toObject();
  } catch (err) {
    console.error('Error in createEvent:', err);
    throw err;
  }
};

// ==================== READ SINGLE EVENT ====================
export const getEventDetails = async (payload) => {
  try {
    const result = await Event.findOne(payload);
    return result ? result.toObject() : null;
  } catch (err) {
    console.error('Error in getEventDetails:', err);
    throw err;
  }
};

// ==================== READ ALL EVENTS ====================
export const getEventList = async (payload = {}) => {
  try {
    const result = await Event.find(payload);
    return result.map((event) => event.toObject());
  } catch (err) {
    console.error('Error in getEventList:', err);
    throw err;
  }
};

// ==================== UPDATE EVENT ====================
export const updateEvent = async (searchQuery, updateQuery) => {
  try {
    const result = await Event.updateOne(searchQuery, updateQuery, {
      runValidators: true
    });
    return result;
  } catch (err) {
    console.error('Error in updateEvent:', err);
    throw err;
  }
};

// ==================== DELETE EVENT ====================
export const deleteEvent = async (searchQuery) => {
  try {
    const result = await Event.deleteOne(searchQuery);
    return result;
  } catch (err) {
    console.error('Error in deleteEvent:', err);
    throw err;
  }
};

export const bulkCreateEvent = async (payload) => {
  try {
    await Event.insertMany(payload);
    return true;
  } catch (err) {
    console.error('Error in bulkCreateEvent:', err);
    throw err;
  }
};
