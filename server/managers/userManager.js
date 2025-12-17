import UserSchema from '../models/userModel.js';

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
