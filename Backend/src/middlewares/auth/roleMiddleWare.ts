import { Request, Response, NextFunction } from "express";
import { RoleRequest } from "@app/utils/types/userRoles";
import asyncHandler from "@app/middlewares/asyncHandler/asyncHandler";

// Middleware to check if user has one of the allowed roles
export const roleGuard = (allowedRoles: string[]) =>
    asyncHandler<void, RoleRequest>(async (req: RoleRequest, res: Response, next: NextFunction) => {
        const userRole = req.user?.role_name?.toLowerCase(); // Normalize to lowercase
        if (!userRole || !allowedRoles.map(r => r.toLowerCase()).includes(userRole)) {
            res.status(403).json({ message: "Access denied: Insufficient permissions" });
            return 
        }
        next();
    });

// ✅ Specific guards using normalized roles
export const adminGuard = roleGuard(["admin"]);        // Full control
export const userGuard = roleGuard(["user"]);          // Normal user actions
export const adminOrUserGuard = roleGuard(["admin", "user"]); // Mixed-access