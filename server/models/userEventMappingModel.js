import mongoose from 'mongoose';

const userEventMappingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },

    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required']
    },

    status: {
      type: String,
      enum: {
        values: ['registered', 'cancelled', 'attended'],
        message: 'Status must be either registered, cancelled, or attended'
      },
      default: 'registered'
    },

    registered_at: {
      type: Date,
      default: Date.now,
      validate: {
        validator(value) {
          return value instanceof Date && !isNaN(value);
        },
        message: 'Please provide a valid registration date'
      }
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

// Prevent duplicate registrations for the same user and event
userEventMappingSchema.index({ user_id: 1, event_id: 1 }, { unique: true });

const UserEventMapping = mongoose.model('UserEventMapping', userEventMappingSchema);
export default UserEventMapping;