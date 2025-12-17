import bcrypt from 'bcrypt';
import * as UserManager from '../managers/userManager.js';

/**
 * ==================== CREATE USER ====================
 */
export const createUserProfile = async (req, res) => {
  try {
    if (!req.body.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing!' });
    }

    const params = req.body.payload;

    // Validate required fields
    if (!params.email || !params.first_name || !params.password) {
      return res.status(406).json({ success: false, message: 'Required fields missing!' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(params.email)) {
      return res.status(422).json({ success: false, message: 'Invalid email format' });
    }

    // Check if email already exists
    const existingUser = await UserManager.getUserDetails({
      email: params.email.toLowerCase()
    });

    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }

    // Validate address fields if country is India
    if (params.country === 'India') {
      if (!params.state || !params.city || !params.pincode || !params.full_address) {
        return res.status(406).json({ success: false, message: 'State, city, pincode, and full address are required for India' });
      }

      // Validate pincode format for India
      const pincodeRegex = /^[1-9]{1}[0-9]{5}$/;
      if (!pincodeRegex.test(params.pincode)) {
        return res.status(422).json({ success: false, message: 'Invalid pincode format' });
      }
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(params.password, salt);

    // Create user payload
    const payload = {
      first_name: params.first_name.trim(),
      last_name: params.last_name || '',
      email: params.email.toLowerCase(),
      password: passwordHash,
      salt,
      is_active: true,
      country: params.country || '',
      state: params.state || '',
      city: params.city || '',
      pincode: params.pincode || '',
      full_address: params.full_address || ''
    };

    // Create the user in the database
    await UserManager.createUserProfile(payload);

    res.status(200).json({ success: true, message: 'User Profile created successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * ==================== UPDATE USER ====================
 */
export const updateUserProfile = async (req, res) => {
  try {
    if (!req.body.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing!' });
    }

    const params = req.body.payload;

    if (!params.id) {
      return res.status(406).json({ success: false, message: 'User ID is required' });
    }

    const existingUser = await UserManager.getUserDetails({ _id: params.id });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if country is India and validate address fields
    if (params.country === 'India') {
      if (!params.state || !params.city || !params.pincode || !params.full_address) {
        return res.status(406).json({ success: false, message: 'State, city, pincode, and full address are required for India' });
      }

      // Validate pincode format for India
      const pincodeRegex = /^[1-9]{1}[0-9]{5}$/;
      if (!pincodeRegex.test(params.pincode)) {
        return res.status(422).json({ success: false, message: 'Invalid pincode format' });
      }
    }

    // Prepare payload to update
    const payload = {
      first_name: params.first_name ?? existingUser.first_name,
      last_name: params.last_name ?? existingUser.last_name,
      is_active: params.is_active ?? existingUser.is_active,
      country: params.country ?? existingUser.country,
      state: params.state ?? existingUser.state,
      city: params.city ?? existingUser.city,
      pincode: params.pincode ?? existingUser.pincode,
      full_address: params.full_address ?? existingUser.full_address
    };

    // Update user details
    await UserManager.updateUserDetails({ _id: params.id }, payload);

    res.status(200).json({ success: true, message: 'User Profile updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * ==================== DELETE USER ====================
 */
export const deleteUserProfile = async (req, res) => {
  try {
    if (!req.body.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing!' });
    }

    const params = req.body.payload;

    if (!params.id) {
      return res.status(406).json({ success: false, message: 'User ID is required' });
    }

    const existingUser = await UserManager.getUserDetails({ _id: params.id });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await UserManager.deleteUser({ _id: params.id });

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * ==================== LIST USERS ====================
 */
export const getUserList = async (req, res) => {
  try {
    const userList = await UserManager.getUserList({});
    res.status(200).json({ success: true, userList });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * ==================== GET USER DETAIL ====================
 */
export const getUserDetail = async (req, res) => {
  try {
    if (!req.query.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing!' });
    }

    const params = JSON.parse(req.query.payload);

    if (!params.id) {
      return res.status(406).json({ success: false, message: 'User ID is required' });
    }

    const user = await UserManager.getUserDetails({ _id: params.id });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * ==================== LOGIN USER ====================
 */
export const loginUser = async (req, res) => {
  try {
    if (!req.body.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing' });
    }

    const params = req.body.payload;

    if (!params.email || !params.password) {
      return res.status(406).json({ success: false, message: 'Email and password required' });
    }

    const user = await UserManager.getUserDetails({
      email: params.email.toLowerCase()
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not registered' });
    }

    const isMatch = await bcrypt.compare(params.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (!user.is_active) {
      return res.status(403).json({ success: false, message: 'Account is deactivated' });
    }

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
