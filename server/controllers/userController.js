import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as UserManager from '../managers/userManager.js';
import * as UserEventMappingManager from '../managers/userManager.js';
import * as EventManager from '../managers/eventManager.js';

const allowedRoles = ['Super Admin', 'Admin', 'Visitor'];



/**
 * ==================== PUBLIC SIGNUP ====================
 * Role: Visitor only
 * No created_by
 */
export const signupUser = async (req, res) => {
  try {
    if (!req.body.payload) {
      return res.status(406).json({
        success: false,
        message: 'Request data missing',
      });
    }

    const params = req.body.payload;

    // Required fields
    if (!params.first_name || !params.last_name || !params.email || !params.password) {
      return res.status(406).json({
        success: false,
        message: 'Required fields missing',
      });
    }

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(params.email)) {
      return res.status(422).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Check existing user
    const existingUser = await UserManager.getUserDetails({
      email: params.email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Password validation (same as schema)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;

    if (!passwordRegex.test(params.password)) {
      return res.status(422).json({
        success: false,
        message:
          'Password must contain uppercase, lowercase, number, and special character',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(params.password, salt);

    const payload = {
      first_name: params.first_name.trim(),
      last_name: params.last_name.trim(),
      email: params.email.toLowerCase(),
      password: passwordHash,
      salt,
      role: 'Visitor',
      created_by: null,
      is_active: true,
      country: params.country || '',
      state: params.state || '',
      city: params.city || '',
      pincode: params.pincode || '',
      full_address: params.full_address || '',
    };

    const newUser = await UserManager.createUserProfile(payload);

    res.status(201).json({
      success: true,
      message: 'Signup successful',
      data: {
        _id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

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
        return res.status(406).json({
          success: false,
          message: 'State, city, pincode, and full address are required for India'
        });
      }

      // Validate pincode format for India
      const pincodeRegex = /^[1-9]{1}[0-9]{5}$/;
      if (!pincodeRegex.test(params.pincode)) {
        return res.status(422).json({ success: false, message: 'Invalid pincode format' });
      }
    }

    // Handle role
    let role = 'Visitor'; // default role
    if (params.role && allowedRoles.includes(params.role)) {
      role = params.role;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(params.password, salt);

    let createdBy = null;
    if (role !== 'Visitor') {
      // Admin/Super Admin creation must specify 
      if (params.created_by) {
        createdBy = params.created_by;
      }
    }

    // Create user payload
    const payload = {
      first_name: params.first_name.trim(),
      last_name: params.last_name || '',
      email: params.email.toLowerCase(),
      password: passwordHash,
      salt,
      is_active: true,
      role,
      created_by: createdBy,
      country: params.country || '',
      state: params.state || '',
      city: params.city || '',
      pincode: params.pincode || '',
      full_address: params.full_address || ''
    };

    const newUser = await UserManager.createUserProfile(payload);

    res.status(201).json({
      success: true,
      message: 'User Profile created successfully',
      data: {
        _id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        role: newUser.role,
        created_by: newUser.created_by
      }
    });
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

    // Validate address fields if country is India
    if (params.country === 'India') {
      if (!params.state || !params.city || !params.pincode || !params.full_address) {
        return res.status(406).json({
          success: false,
          message: 'State, city, pincode, and full address are required for India'
        });
      }

      const pincodeRegex = /^[1-9]{1}[0-9]{5}$/;
      if (!pincodeRegex.test(params.pincode)) {
        return res.status(422).json({ success: false, message: 'Invalid pincode format' });
      }
    }

    // Update role if provided
    let role = existingUser.role;
    if (params.role && allowedRoles.includes(params.role)) {
      role = params.role;
    }

    const payload = {
      first_name: params.first_name ?? existingUser.first_name,
      last_name: params.last_name ?? existingUser.last_name,
      is_active: params.is_active ?? existingUser.is_active,
      country: params.country ?? existingUser.country,
      state: params.state ?? existingUser.state,
      city: params.city ?? existingUser.city,
      pincode: params.pincode ?? existingUser.pincode,
      full_address: params.full_address ?? existingUser.full_address,
      role
    };

    const updatedUser = await UserManager.updateUserDetails({ _id: params.id }, payload);

    res.status(200).json({
      success: true,
      message: 'User Profile updated successfully',
      data: {
        _id: updatedUser._id,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        role: updatedUser.role,
        created_by: updatedUser.created_by
      }
    });
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
    const { role, search } = req.query;

    const filter = {};

    // 🔹 ROLE FILTER (Admin / Super Admin / Visitor)
    if (role) {
      filter.role = role;
    }

    // 🔹 SEARCH FILTER (name / email)
    if (search) {
      filter.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const userList = await UserManager.getUserList(filter);

    res.status(200).json({
      success: true,
      userList,
    });
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

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        created_by: user.created_by
      }
    });
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
      return res.status(406).json({
        success: false,
        message: 'Request data missing',
      });
    }

    const { email, password } = req.body.payload;

    if (!email || !password) {
      return res.status(406).json({
        success: false,
        message: 'Email and password required',
      });
    }

    const user = await UserManager.getUserDetails({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not registered',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated',
      });
    }

    // JWT TOKEN GENERATION
    const token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ==================== USER EVENT MAPPING CONTROLLERS ====================
 */
export const registerEvent = async (req, res) => {
  try {
    if (!req.body.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing!' });
    }

    const params = req.body.payload;

    if (!params.user_id || !params.event_id) {
      return res.status(406).json({ success: false, message: 'User ID and Event ID are required' });
    }

    const event = await EventManager.getEventDetails({ _id: params.event_id });
    if (!event || !event.is_active || !event.registration_open) {
      return res.status(403).json({ success: false, message: 'Event registration is closed' });
    }

    const alreadyRegistered = await UserEventMappingManager.getUserEventMapping({
      user_id: params.user_id,
      event_id: params.event_id
    });

    if (alreadyRegistered) {
      return res.status(409).json({ success: false, message: 'User already registered for this event' });
    }

    const totalRegistrations = await UserEventMappingManager.countUserEventMappings({
      event_id: params.event_id,
      status: 'registered'
    });

    if (totalRegistrations >= event.capacity) {
      return res.status(409).json({ success: false, message: 'Event capacity full' });
    }

    const payload = {
      user_id: params.user_id,
      event_id: params.event_id,
      status: 'registered'
    };

    const registration = await UserEventMappingManager.createUserEventMapping(payload);

    res.status(200).json({
      success: true,
      message: 'Event registered successfully',
      data: registration
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const cancelRegistration = async (req, res) => {
  try {
    if (!req.body.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing!' });
    }

    const params = req.body.payload;

    if (!params.user_id || !params.event_id) {
      return res.status(406).json({ success: false, message: 'User ID and Event ID required' });
    }

    await UserEventMappingManager.updateUserEventMapping(
      { user_id: params.user_id, event_id: params.event_id },
      { status: 'cancelled' }
    );

    res.status(200).json({ success: true, message: 'Registration cancelled successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getUserRegistrations = async (req, res) => {
  try {
    if (!req.query.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing!' });
    }

    const params = JSON.parse(req.query.payload);

    if (!params.user_id) {
      return res.status(406).json({ success: false, message: 'User ID is required' });
    }

    const data = await UserEventMappingManager.getUserEventMappingList({
      user_id: params.user_id
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getEventRegistrations = async (req, res) => {
  try {
    if (!req.query.payload) {
      return res.status(406).json({ success: false, message: 'Request data missing!' });
    }

    const params = JSON.parse(req.query.payload);

    if (!params.event_id) {
      return res.status(406).json({ success: false, message: 'Event ID is required' });
    }

    const data = await UserEventMappingManager.getUserEventMappingList({
      event_id: params.event_id
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
