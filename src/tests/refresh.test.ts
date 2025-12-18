import app from "../app.js";
import { prisma } from "../config/prisma.js";
import request from "supertest";

describe("Auth refresh", () => {
    let refreshToken: string;
    beforeAll(async () => {
        await prisma.refreshToken.deleteMany();
        const result = await request(app).post("/api/auth/login").send({
            email: "test@test.com",
            password: "P@ssword123",
        });
        refreshToken = result.body.refreshToken;
    });

    it("should return tokens", async () => {
        const result = await request(app)
            .post("/api/auth/refresh")
            .send({ refreshToken });
        expect(result.status).toBe(200);
        expect(result.body.accessToken).toBeDefined();
    });

    it("should fail with revoked token", async () => {
        await prisma.refreshToken.updateMany({
            where: { token: refreshToken },
            data: { revoked: true },
        });
        const result = await request(app)
            .post("/api/auth/refresh")
            .send({ refreshToken });
        expect(result.status).toBe(401);
        expect(result.body.message).toBe("Invalid refresh token");
    });
});
