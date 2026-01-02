import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    event_id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
      minlength: [2, 'Event name must be at least 2 characters'],
      maxlength: [100, 'Event name cannot exceed 100 characters'],
    },

    description: {
      type: String,
      trim: false,
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },

    start_date: {
      type: String,
      required: [true, 'Event start date is required']
    },

    end_date: {
      type: String,
      required: [true, 'Event end date is required']
    },

    start_time: {
      type: String, // store as "HH:mm" format
      required: [true, 'Event start time is required'],
      match: [/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Start time must be in HH:mm format']
    },

    end_time: {
      type: String, // store as "HH:mm" format
      required: [true, 'Event end time is required'],
      match: [/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'End time must be in HH:mm format']
    },

    // location: {
    //   type: String,
    //   required: [false, 'Event location is required'],
    //   trim: true,
    //   minlength: [2, 'Location must be at least 2 characters'],
    //   maxlength: [255, 'Location cannot exceed 255 characters']
    // },

    event_type: {
      type: String,
      enum: ['In-person', 'Virtual', 'Hybrid'],
      required: [false, 'Event type is required'],
      default: 'In-person'
    },

    source_language: {
      type: String,
      required: [true, 'Event source language is required'],
      trim: true,
      default: 'English'
    },

    capacity: {
      type: Number,
      required: [false, 'Event capacity is required'],
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
      required: [false, 'Event creator is required']
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    versionKey: false
  },
  {timestamps:true}
);

const Event = mongoose.model('Event', eventSchema);
export default Event;
