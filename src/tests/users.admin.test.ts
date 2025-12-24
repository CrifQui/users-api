import app from "../app.js";
import bcrypt from "bcrypt";
import { prisma } from "../config/prisma.js";
import request from "supertest";

describe("Admin user module", () => {
    let adminToken: string;
    let adminRoleId: string;
    let adminUserId: string;

    beforeAll(async () => {
        await prisma.user.deleteMany();

        const adminRole = await prisma.role.findUnique({
            where: { name: "ADMIN" },
        });

        if (!adminRole) {
            throw new Error("ADMIN role not found");
        }

        adminRoleId = adminRole.id;

        const admin = await prisma.user.create({
            data: {
                email: "admin@test.com",
                password: await bcrypt.hash("Admin123!", 10),
                name: "Admin Test",
                roleId: adminRoleId,
            },
        });

        adminUserId = admin.id;

        const loginRes = await request(app).post("/api/auth/login").send({
            email: "admin@test.com",
            password: "Admin123!",
        });

        adminToken = loginRes.body.accessToken;
    });

    afterAll(async () => {
        await prisma.user.deleteMany();
    });

    it("should list all users", async () => {
        const res = await request(app)
            .get("/api/users")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should not create user when email already exists", async () => {
        const res = await request(app)
            .post("/api/users")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                email: "admin@test.com",
                password: "Password123!",
                roleId: adminRoleId,
            });

        expect(res.status).toBe(409);
    });

    it("should create a new user", async () => {
        const email = "user1@test.com";

        const res = await request(app)
            .post("/api/users")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                email,
                password: "Password123!",
                name: "User One",
                roleId: adminRoleId,
            });

        expect(res.status).toBe(201);
        expect(res.body.email).toBe(email);
    });

    it("should get user by id", async () => {
        const res = await request(app)
            .get(`/api/users/${adminUserId}`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.status).toBe(200);
        expect(res.body.id).toBe(adminUserId);
    });

    it("should update user", async () => {
        const res = await request(app)
            .put(`/api/users/${adminUserId}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                name: "Admin Updated",
                roleId: adminRoleId,
            });

        expect(res.status).toBe(200);
        expect(res.body.name).toBe("Admin Updated");
    });
});
