import jwt from "jsonwebtoken";
import { findUserByEmail, comparePassword } from "./db";

const SECRET_KEY = "your-secret-key"; // Replace with a secure key

// Generate a JWT token
export function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    SECRET_KEY,
    {
      expiresIn: "1h", // Token expires in 1 hour
    }
  );
}

// Verify a JWT token
export function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

// Authenticate a user
export async function authenticateUser(email, password) {
  const user = findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  return user;
}
