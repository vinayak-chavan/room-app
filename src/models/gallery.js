const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
    trim: true,
  }
});

const gallery = new mongoose.model("gallery", gallerySchema);

module.exports = gallery;
