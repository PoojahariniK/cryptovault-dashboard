const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/asset.controller");

router.post("/", auth, controller.addAsset);
router.get("/", auth, controller.getAssets);
router.put("/:id", auth, controller.updateAsset);
router.delete("/:id", auth, controller.deleteAsset);

module.exports = router;
