import { Request, Response } from "express";
import { loginUser, refreshAccessToken, registerUser } from "./service.js";

export const register = async (req: Request, res: Response) => {
    const data = req.body;
    const user = await registerUser(data);

    return res.status(201).json({
        message: "User created",
        user,
    });
};

export const login = async (req: Request, res: Response) => {
    const data = req.body;
    const result = await loginUser(data);

    return res.status(201).json(result);
};

export const refresh = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const result = await refreshAccessToken(refreshToken);
    res.status(200).json(result);
};
