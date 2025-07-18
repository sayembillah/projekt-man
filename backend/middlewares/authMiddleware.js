const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes

const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1]; //Extract the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // returns an object
      req.user = await User.findById(decoded.id).select("-password"); //fetching the user from the database by their ID (from the decoded JWT token), excluding the password field.
      next();
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Token Failed", error: error.message });
  }
};

//Middleware for admin only access

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access, Admin only" });
  }
};

module.exports = { protect, adminOnly }; //exporting the middleware functions
