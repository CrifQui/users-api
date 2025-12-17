import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

interface JwtPayload {
    sub: string;
    role: string;
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer "))
        return res.status(401).json({ message: "Unauthorized" });

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        req.user = {
            id: decoded.sub,
            role: decoded.role,
        };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
