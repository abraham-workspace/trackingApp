import { Request, Response } from "express";
import pool from "@app/db/db";
import asyncHandler from "@app/middlewares/asyncHandler/asyncHandler";
import { UserRequest } from "@app/utils/types/userTypes";

// Get all users
export const getUsers = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const result = await pool.query('SELECT id, name, email FROM users ORDER BY id DESC');
        res.status(200).json(result.rows);
    } catch (err: unknown) {
        console.error('Error fetching users:', err instanceof Error ? err.message : err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// Update a user
export const updateUser = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const result = await pool.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING id, name, email',
            [name, email, password, id]
        );

        if (result.rows.length === 0) {
             res.status(404).json({ message: 'User not found' });
            return
        }

        res.status(200).json(result.rows[0]);
    } catch (err: unknown) {
        console.error('Error updating user:', err instanceof Error ? err.message : err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete a user
export const deleteUser = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id',
            [id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return 
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err: unknown) {
        console.error('Error deleting user:', err instanceof Error ? err.message : err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});