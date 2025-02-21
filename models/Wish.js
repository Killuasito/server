const mongoose = require("mongoose");

const WishSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    completed: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    color: { type: String, default: "pink" },
    icon: { type: String, default: "FaHeart" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wish", WishSchema);
