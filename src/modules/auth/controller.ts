import { Request, Response } from "express";

import { registerUser } from "./service.js";

export const register = async (req: Request, res: Response) => {
    const data = req.body;
    const user = await registerUser(data);

    return res.status(201).json({
        message: "User created",
        user,
    });
};
