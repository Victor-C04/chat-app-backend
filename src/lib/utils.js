import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  // Sign the token with the user ID and secret key
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token will expire in 7 days
  });

  // Set the token in an HTTP-only cookie
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none", // Change from "strict" to "none" to allow cross-origin
    secure: true, // Must be true when sameSite is "none"
  });

  return token; // Optionally return the token
};

