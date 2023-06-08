const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomname: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
    required: true,
    trim: true,
  }
});

const room = new mongoose.model("room", roomSchema);

module.exports = room;
