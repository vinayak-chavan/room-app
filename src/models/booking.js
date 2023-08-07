const mongoose = require('mongoose');
const Schema = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "room",
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  timeSlot: {
    type: String,
    required: true,
    trim: true,
  },
  reason: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    default: 'Pending',
    trim: true,
  }
});

const booking = new mongoose.model('booking', bookingSchema);

module.exports = booking;
