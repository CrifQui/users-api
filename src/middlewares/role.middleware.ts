import { NextFunction, Request, Response } from "express";

import { Role } from "../generated/client/client.js";

export const roleMiddleware =
    (...allowedRoles: Role["name"][]) =>
    (req: Request, res: Response, next: NextFunction) => {
        if (!req.user)
            return res.status(401).json({ message: "Unauthoraized" });
        if (!allowedRoles.includes(req.user.role))
            return res.status(403).json({ message: "Forbidden" });

        next();
    };
