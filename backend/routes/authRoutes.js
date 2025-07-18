const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
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

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});

module.exports = router;
