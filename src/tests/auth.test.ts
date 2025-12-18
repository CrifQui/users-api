import app from "../app.js";
import { prisma } from "../config/prisma.js";
import request from "supertest";

describe("Auth fllow", () => {
    const userData = {
        email: "test@test.com",
        password: "P@ssword123",
        name: "Test",
    };
    beforeAll(async () => {
        await prisma.user.deleteMany();
        await prisma.refreshToken.deleteMany();
    });
    it("should register a user", async () => {
        const result = await request(app)
            .post("/api/auth/register")
            .send(userData);
        expect(result.status).toBe(201);
        expect(result.body.user.email).toBe(userData.email);
    });
    it("shoul login user", async () => {
        const result = await request(app).post("/api/auth/login").send({
            email: userData.email,
            password: userData.password,
        });
        expect(result.status).toBe(201);
        expect(result.body.accessToken).toBeDefined();
        expect(result.body.refreshToken).toBeDefined();
    });
});
