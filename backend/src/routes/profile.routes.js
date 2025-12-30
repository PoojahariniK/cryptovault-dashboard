const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/profile.controller");

router.put("/update-name", auth, controller.updateName);
router.put("/change-password", auth, controller.changePassword);

module.exports = router;
