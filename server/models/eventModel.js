import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
      minlength: [2, 'Event name must be at least 2 characters'],
      maxlength: [100, 'Event name cannot exceed 100 characters'],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },

    start_time: {
      type: Date,
      required: [true, 'Event start time is required'],
      validate: {
        validator(value) {
          return value instanceof Date && !isNaN(value);
        },
        message: 'Please provide a valid start time'
      }
    },

    end_time: {
      type: Date,
      required: [true, 'Event end time is required'],
      validate: {
        validator(value) {
          return value instanceof Date && !isNaN(value);
        },
        message: 'Please provide a valid end time'
      }
    },

    location: {
      type: String,
      required: [true, 'Event location is required'],
      trim: true,
      minlength: [2, 'Location must be at least 2 characters'],
      maxlength: [255, 'Location cannot exceed 255 characters']
    },

    capacity: {
      type: Number,
      required: [true, 'Event capacity is required'],
      min: [1, 'Capacity must be at least 1']
    },

    is_active: {
      type: Boolean,
      default: true
    },

    registration_open: {
      type: Boolean,
      default: true
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Event creator is required']
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

const Event = mongoose.model('Event', eventSchema);
export default Event;
