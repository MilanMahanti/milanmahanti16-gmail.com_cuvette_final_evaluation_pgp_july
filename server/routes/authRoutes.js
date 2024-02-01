const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get(
  "/current-user",
  authController.protect,
  authController.getCurrentUser
);
module.exports = router;
