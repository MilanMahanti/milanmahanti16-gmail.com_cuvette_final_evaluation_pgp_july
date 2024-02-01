const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.use(authController.protect);
router.get("/", (req, res, next) => {
  res.status(200).json({
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: "OK",
    requestedAt: res.requestedAt,
  });
});

module.exports = router;
