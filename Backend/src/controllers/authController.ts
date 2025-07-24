import { Request, Response } from "express";
import pool from "@app/db/db";
import bcrypt from "bcryptjs";
import asyncHandler from "@app/middlewares/asyncHandler/asyncHandler";
import { generateToken } from "@app/utils/helpers/generateToken";

//  Register User
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password, role_id } = req.body;

    const userExists = await pool.query("SELECT id FROM users WHERE email = $1", [email]);

    if (userExists.rows.length > 0) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
        `INSERT INTO users(name, email, password_hash, role_id) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id, name, email, role_id`,
        [name, email, hashedpassword, role_id]
    );

    const user = newUser.rows[0];
    const accessToken = generateToken(user.id, user.role_id);

    res.status(201).json({
        message: "User registered successfully",
        accessToken,
        user
    });
})

// ✅ Login User
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userQuery = await pool.query(
        `SELECT users.id, users.name, users.email, users.password_hash, users.role_id, roles.name
         FROM users
         JOIN roles ON users.role_id = roles.id
         WHERE users.email = $1`,
        [email]
    );

    if (userQuery.rows.length === 0) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }

    const user = userQuery.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }

    const accessToken = generateToken(user.id, user.role_id);

    res.status(200).json({
        message: "Login successful",
        accessToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role_id: user.role_id,
            role_name: user.role_name,
        },
    });
});

// ✅ Logout User
export const logoutUser = asyncHandler(async (_req: Request, res: Response) => {
    res.status(200).json({
        message: "User logged out successfully (client-side token should be deleted)"
    });
});
