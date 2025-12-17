import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const JWT_EXPIRES_IN = "15m";
const REFRESH_EXPIRES_IN = "7d";

if (!JWT_SECRET || !REFRESH_SECRET) throw new Error("JWT Secrets not defined");

export const getAccessToken = (payload: object) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const getRefreshToken = (payload: object) => {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_SECRET);
};
