import { Request, Response } from "express";

import service from "./service.js";

export const getProfile = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const user = await service.getUser(userId);
    return res.status(200).json(user);
};

export const getUsers = async (req: Request, res: Response) => {
    const user = await service.getUsers();
    return res.json(user);
};

export const getUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await service.getUser(userId);
    return res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
    const data = req.body;
    const user = await service.createUser(data);
    return res.status(201).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
    const data = req.body;
    const userId = req.params.id;
    const user = await service.updateUser(userId, data);
    return res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const user = await service.deleteUser(userId);
    return res.status(204).json(user);
};
