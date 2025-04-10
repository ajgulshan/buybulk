import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "b250cb2fb939d7b8fdc430106cd9d9318b7b0cec56a1c0cd5d959eb399c0de27";

// Generate Token
export const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
};

// Verify Token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
