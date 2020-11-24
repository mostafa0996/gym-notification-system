const mongoose = require('mongoose');

const { Schema } = mongoose;

const AttendanceSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    checkIn: {
      type: Date,
      default: Date.now()
    },
    checkOut: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Attendance = mongoose.model('Attendance', AttendanceSchema);
module.exports = Attendance;
