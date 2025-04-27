import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  // Sign the token with the user ID and secret key
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token will expire in 7 days
  });

  // Set the token in an HTTP-only cookie
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration (7 days in milliseconds)
    httpOnly: true, // Prevents access to the cookie from JavaScript (XSS protection)
    sameSite: "strict", // CSRF protection: cookie is sent only in first-party contexts
    secure: process.env.NODE_ENV !== "development", // Only set cookie over HTTPS in production
  });

  return token; // Optionally return the token
};

