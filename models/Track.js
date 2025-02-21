const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    embedUrl: { type: String, required: true },
    spotifyUrl: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Track", TrackSchema);
