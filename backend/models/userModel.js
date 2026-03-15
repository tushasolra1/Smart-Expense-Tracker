const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName:  { type: String },
    email:     { type: String, required: true, unique: true },
    password:  { type: String, required: true },
    
    budget: { type: Number, default: 0 },
    monthlyGoal: { type: Number, default: 0 },
    notifications: { type: Boolean, default: true },
    avatar: { type: String, default: 'default-avatar.png' }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);