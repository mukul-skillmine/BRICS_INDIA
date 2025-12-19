import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters'],
      maxlength: [50, 'First name cannot exceed 50 characters'],
      match: [/^[a-zA-Z\s]+$/, 'First name can contain only letters and spaces']
    },

    last_name: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters'],
      maxlength: [50, 'Last name cannot exceed 50 characters'],
      match: [/^[a-zA-Z\s]+$/, 'Last name can contain only letters and spaces']
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      maxlength: [128, 'Password cannot exceed 128 characters'],
      validate: {
        validator(value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/.test(value);
        },
        message: 'Password must contain uppercase, lowercase, number, and special character'
      }
    },

    salt: {
      type: String,
      required: [true, 'Salt is required']
    },

    role: {
      type: String,
      enum: ['Super Admin', 'Admin', 'Visitor'],
      default: 'Visitor',
      required: true
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null  // null for Visitor or top-level Super Admin
    },

    is_active: {
      type: Boolean,
      default: true
    },

    country: { type: String, trim: true },
    state: { type: String, trim: true },
    city: { type: String, trim: true },
    pincode: { type: String, trim: true },
    full_address: { type: String, trim: true, maxlength: [255, 'Full address cannot exceed 255 characters'] }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    versionKey: false
  }
);

const User = mongoose.model('User', userSchema);
export default User;
