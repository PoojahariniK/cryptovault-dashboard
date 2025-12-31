const authService = require("../services/auth.service");

async function register(req, res) {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

async function login(req, res) {
  try {
    const result = await authService.loginUser(req.body);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure:true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      user: result.user,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
}

function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(200).json({ message: "Logged out successfully" });
}

function me(req, res) {
  res.json({
    id: req.user.id,
    email: req.user.email,
    username: req.user.username,
  });
}

module.exports = {
  register,
  login,
  logout,
  me,
};
