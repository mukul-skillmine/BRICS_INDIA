import UserSchema from '../models/userModel.js';
import UserEventMapping from '../models/userEventMappingModel.js';

// Create
export const createUserProfile = async (payload) => {
  try {
    const result = await UserSchema.create(payload);
    return result.toObject();
  } catch (err) {
    console.error('Error in createUserProfile:', err);
    throw err;
  }
};

// Read - single UserSchema
export const getUserDetails = async (payload) => {
  try {
    const result = await UserSchema.findOne(payload);
    return result ? result.toObject() : null;
  } catch (err) {
    console.error('Error in getUserDetails:', err);
    throw err;
  }
};

// Read - all users
export const getUserList = async (payload = {}) => {
  try {
    const result = await UserSchema.find(payload);
    return result.map((UserSchema) => UserSchema.toObject());
  } catch (err) {
    console.error('Error in getUserList:', err);
    throw err;
  }
};

// Update
export const updateUserDetails = async (searchQuery, updateQuery) => {
  try {
    const result = await UserSchema.updateOne(searchQuery, updateQuery, {
      runValidators: true
    });
    return result;
  } catch (err) {
    console.error('Error in updateUserDetails:', err);
    throw err;
  }
};

// Delete
export const deleteUser = async (searchQuery) => {
  try {
    const result = await UserSchema.deleteOne(searchQuery);
    return result;
  } catch (err) {
    console.error('Error in deleteUser:', err);
    throw err;
  }
};


  // ==================== CREATE USER EVENT MAPPING ====================
export const createUserEventMapping = async (payload) => {
  try {
    const result = await UserEventMapping.create(payload);
    return result.toObject();
  } catch (err) {
    console.error('Error in createUserEventMapping:', err);
    throw err;
  }
};

// ==================== READ SINGLE USER EVENT MAPPING ====================
export const getUserEventMapping = async (payload) => {
  try {
    const result = await UserEventMapping.findOne(payload);
    return result ? result.toObject() : null;
  } catch (err) {
    console.error('Error in getUserEventMapping:', err);
    throw err;
  }
};

// ==================== READ USER EVENT MAPPING LIST ====================
export const getUserEventMappingList = async (payload = {}) => {
  try {
    const result = await UserEventMapping.find(payload);
    return result.map((mapping) => mapping.toObject());
  } catch (err) {
    console.error('Error in getUserEventMappingList:', err);
    throw err;
  }
};

// ==================== COUNT USER EVENT MAPPINGS ====================
export const countUserEventMappings = async (payload = {}) => {
  try {
    const count = await UserEventMapping.countDocuments(payload);
    return count;
  } catch (err) {
    console.error('Error in countUserEventMappings:', err);
    throw err;
  }
};

// ==================== UPDATE USER EVENT MAPPING ====================
export const updateUserEventMapping = async (searchQuery, updateQuery) => {
  try {
    const result = await UserEventMapping.updateOne(searchQuery, updateQuery, {
      runValidators: true
    });
    return result;
  } catch (err) {
    console.error('Error in updateUserEventMapping:', err);
    throw err;
  }
};

// ==================== DELETE USER EVENT MAPPING ====================
export const deleteUserEventMapping = async (searchQuery) => {
  try {
    const result = await UserEventMapping.deleteOne(searchQuery);
    return result;
  } catch (err) {
    console.error('Error in deleteUserEventMapping:', err);
    throw err;
  }
};
