import asyncHandler from '@app/middlewares/asyncHandler/asyncHandler';
import { UserRequest } from '@app/utils/types/userTypes';
import { Response, Request } from 'express';
import pool from "@app/db/db";

// Get all devices
export const getDevices = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const result = await pool.query(
            'SELECT id, user_id, device_name, device_type, serial_number, description, registered_at, is_lost FROM devices ORDER BY id DESC'
        );
        res.status(200).json(result.rows);
    } catch (err: unknown) {
        console.error('Error fetching devices:', err instanceof Error ? err.message : err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get device by ID
export const getDeviceById = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const deviceId = req.params.id
        const result = await pool.query(
            'SELECT id, user_id, device_name, device_type, serial_number, description, registered_at, is_lost FROM devices WHERE id = $1',
            [deviceId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Device not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err: unknown) {
        console.error('Error fetching device by ID:', err instanceof Error ? err.message : err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Create a new device
export const createDevices = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const {
            device_name,
            device_type,
            serial_number,
            description,
            is_lost
        } = req.body;

        const userId = req.user?.id;

        const result = await pool.query(
            `INSERT INTO devices (user_id, device_name, device_type, serial_number, description, registered_at, is_lost)
             VALUES ($1, $2, $3, $4, $5, NOW(), $6)
             RETURNING *`,
            [userId, device_name, device_type, serial_number, description, is_lost]
        );

        res.status(201).json(result.rows[0]);
    } catch (err: unknown) {
        console.error('Error creating device:', err instanceof Error ? err.message : err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update device
export const updateDevice = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const deviceId = parseInt(req.params.id);
        const {
            device_name,
            device_type,
            serial_number,
            description,
            is_lost
        } = req.body;

        const result = await pool.query(
            `UPDATE devices
             SET device_name = $1, device_type = $2, serial_number = $3,
                 description = $4, is_lost = $5
             WHERE id = $6
             RETURNING *`,
            [device_name, device_type, serial_number, description, is_lost, deviceId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Device not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err: unknown) {
        console.error('Error updating device:', err instanceof Error ? err.message : err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete device
export const deleteDevice = asyncHandler(async (req: UserRequest, res: Response) => {
    try {
        const deviceId = parseInt(req.params.id);

        const result = await pool.query(
            'DELETE FROM devices WHERE id = $1 RETURNING *',
            [deviceId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Device not found' });
        }

        res.status(200).json({ message: 'Device deleted successfully' });
    } catch (err: unknown) {
        console.error('Error deleting device:', err instanceof Error ? err.message : err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
