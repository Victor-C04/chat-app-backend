import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Example logging
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Or use req.headers.authorization if you're using headers
if (!token) {
  return res.status(401).json({ message: "No token provided" });
}


    console.log("Token found, verifying...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      console.error("Token is invalid.");
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    console.log("Token verified, finding user...");
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      console.error("User not found.");
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};




