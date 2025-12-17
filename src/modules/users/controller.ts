import { Request, Response } from "express";

import { getUser } from "./service.js";

export const getProfile = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const profile = await getUser(userId);
    return res.status(200).json(profile);
};
