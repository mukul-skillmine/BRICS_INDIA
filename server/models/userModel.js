import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters'],
      maxlength: [50, 'First name cannot exceed 50 characters'],
      match: [ 
        /^[a-zA-Z\s]+$/,
        'First name can contain only letters and spaces'
      ]
    },

    last_name: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters'],
      maxlength: [50, 'Last name cannot exceed 50 characters'],
      match: [
        /^[a-zA-Z\s]+$/,
        'Last name can contain only letters and spaces'
      ]
    },

    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['Male', 'Female', 'Other'],
      message: 'Gender must be one of the following: Male, Female, Other'
    },

    dob: {
      type: Date,
      required: [true, 'Date of birth is required'],
      validate: {
        validator(value) {
          return value instanceof Date && !isNaN(value);
        },
        message: 'Please provide a valid Date of Birth'
      }
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address'
      ]
    },

    phone_number: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [
        /^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/,
        'Please enter a valid phone number (including country code if applicable)'
      ]
    },

    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
      minlength: [2, 'Country name must be at least 2 characters'],
      maxlength: [50, 'Country name cannot exceed 50 characters'],
    },

    state: {
      type: String,
      trim: true,
      minlength: [2, 'State name must be at least 2 characters'],
      maxlength: [50, 'State name cannot exceed 50 characters']
    },

    city: {
      type: String,
      trim: true,
      minlength: [2, 'City name must be at least 2 characters'],
      maxlength: [50, 'City name cannot exceed 50 characters']
    },

    pincode: {
      type: String,
      match: [
        /^[1-9]{1}[0-9]{5}$/,
        'Please enter a valid 6-digit pincode'
      ]
    },

    full_address: {
      type: String,
      trim: true,
      maxlength: [255, 'Full address cannot exceed 255 characters']
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

    is_active: {
      type: Boolean,
      default: true
    }
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
