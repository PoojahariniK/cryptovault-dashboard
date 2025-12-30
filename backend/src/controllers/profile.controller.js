const profileService = require("../services/profile.service");

async function updateName (req, res)  {
  try {
    const { username } = req.body;
    await profileService.updateUsername(req.user.id, username);
    res.json({ message: "Username updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

async function changePassword (req, res){
  try {
    const { oldPassword, newPassword } = req.body;
    await profileService.changePassword(
      req.user.id,
      oldPassword,
      newPassword
    );
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports={
    updateName,
    changePassword
};