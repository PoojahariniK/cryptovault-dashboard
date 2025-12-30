const bcrypt = require("bcrypt");
const User = require("../models/user.model");

 async function updateUsername(userId, username){
  if (!username || username.length < 3) {
    throw new Error("Username must be at least 3 characters");
  }

  await User.updateUsername(userId, username);
};

async function changePassword(userId, oldPassword, newPassword){
  if (!oldPassword || !newPassword) {
    throw new Error("All fields are required");
  }

  if (newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  const user = await User.findById(userId);

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new Error("Old password is incorrect");
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await User.updatePassword(userId, hashed);
};
module.exports={
    updateUsername,
    changePassword
};