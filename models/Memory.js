const mongoose = require("mongoose");

const MemorySchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true, default: "special-date" },
    icon: { type: String, required: true, default: "FaHeart" },
    color: { type: String, required: true, default: "pink" }, // Garantir que color é required
  },
  { timestamps: true }
);

module.exports = mongoose.model("Memory", MemorySchema);
