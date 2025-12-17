import { NextFunction, Request, Response } from "express";

import { ZodObject } from "zod";

export const validateSchema =
    (schema: ZodObject) =>
    (_req: Request, res: Response, _next: NextFunction) => {
        schema.parse(_req.body);
        _next();
    };
