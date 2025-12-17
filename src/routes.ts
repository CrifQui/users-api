import { Router } from "express";
import authRoutes from "./modules/auth/routes.js";
import userRoutes from "./modules/users/routes.js";
const router = Router();

router.get("/", (_req, res) => {
    res.send("hello world from routes");
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
