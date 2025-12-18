import app from "../app.js";
import { prisma } from "../config/prisma.js";
import request from "supertest";

describe("Auth logout", () => {
    let refreshToken: string;
    beforeAll(async () => {
        await prisma.refreshToken.deleteMany();
        const result = await request(app).post("/api/auth/login").send({
            email: "test@test.com",
            password: "P@ssword123",
        });
        refreshToken = result.body.refreshToken;
    });

    it("should revoke refresh token", async () => {
        const result = await request(app)
            .post("/api/auth/logout")
            .send({ refreshToken });
        expect(result.status).toBe(204);
        const storedRefreshToken = await prisma.refreshToken.findUnique({
            where: { token: refreshToken },
        });
        expect(storedRefreshToken?.revoked).toBe(true);
    });

    it("should not allow refresh after logout", async () => {
        const result = await request(app)
            .post("/api/auth/refresh")
            .send({ refreshToken });
        expect(result.status).toBe(401);
        expect(result.body.message).toBe("Invalid refresh token");
    });
});
