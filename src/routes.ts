import { Router } from "express";
import authRoutes from "./modules/auth/routes.js";
const router = Router();

router.get("/", (_req, res) => {
    res.send("hello world from routes");
});

router.use("/auth", authRoutes);
export default router;
