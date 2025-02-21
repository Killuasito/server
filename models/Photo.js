const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Photo", PhotoSchema);
