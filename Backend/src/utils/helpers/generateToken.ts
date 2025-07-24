import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userId: string, roleId: number): string => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    // Generate short-lived access token (e.g. 7d or 30d for mobile)
    const accessToken = jwt.sign({ userId, roleId }, jwtSecret, {
      expiresIn: "7d", // adjust as needed
    });

    return accessToken;
  } catch (error) {
    console.error("Error generating JWT:", error);
    throw new Error("Error generating authentication token");
  }
};
