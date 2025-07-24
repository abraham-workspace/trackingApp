import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import pool from "@app/db/db";
import { UserRequest } from "@app/utils/types/userTypes";
import asyncHandler from "@app/middlewares/asyncHandler/asyncHandler";

// Protect middleware for JWT-based auth (ideal for mobile apps)
export const protect = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    // Get token from Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized: token missing" });
    }

    try {
        // Ensure secret exists
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined");
        }

        // Decode token
        const decoded = jwt.verify(token, jwtSecret) as { userId: number; roleId: number };

        // Fetch user from DB
        const { rows } = await pool.query(
            `SELECT 
                a.id AS id, 
                a.name, 
                a.email, 
                a.role_id, 
                ur.role_name
             FROM users a
             JOIN roles ur ON a.role_id = ur.id
             WHERE a.id = $1`,
            [decoded.userId]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: "Not authorized: user not found" });
        }

        // Attach user to request
        req.user = rows[0];
        next();
    } catch (err) {
        console.error("❌ JWT verification failed:", err);
        res.status(401).json({ message: "Not authorized: token invalid or expired" });
    }
});
