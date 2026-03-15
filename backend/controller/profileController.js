const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// 🔥 GET Profile
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

// 🔥 UPDATE Profile
const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, budget, monthlyGoal, notifications } = req.body;
  
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  
  // Update only provided fields
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (email) user.email = email;
  if (budget !== undefined) user.budget = parseFloat(budget) || 0;
  if (monthlyGoal !== undefined) user.monthlyGoal = parseFloat(monthlyGoal) || 0;
  if (notifications !== undefined) user.notifications = notifications;
  
  const updatedUser = await user.save();
  
  res.status(200).json({
    _id: updatedUser._id,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    email: updatedUser.email,
    budget: updatedUser.budget,
    monthlyGoal: updatedUser.monthlyGoal,
    notifications: updatedUser.notifications,
    message: "Profile updated successfully! ✅"
  });
});

module.exports = { getProfile, updateProfile };