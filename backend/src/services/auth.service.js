const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

async function registerUser({ username, email, password }) {
  if (!username || username.length < 3) {
    throw new Error("Username must be at least 3 characters");
  }

  if (!email || !emailRegex.test(email)) {
    throw new Error("Invalid email address");
  }

  if (!password || !passwordRegex.test(password)) {
    throw new Error(
      "Password must be at least 8 characters and include uppercase, lowercase, and a number"
    );
  }

  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await User.createUser(
    username,
    email,
    hashedPassword
  );

  return {
    id: userId,
    username,
    email,
  };
}

async function loginUser({ email, password }) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
  
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
  
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
  
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
  
  module.exports = {
    registerUser,
    loginUser,
  };
