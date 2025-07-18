const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");

const router = express.Router();

//Auth Routes
router.post("/register", registerUser); // Register the user
router.post("/login", loginUser); // Login the user
router.get("/profile", protect, getUserProfile); //Get user profile
router.put("/profile", protect, updateUserProfile); //Update the user profile

module.exports = router;
