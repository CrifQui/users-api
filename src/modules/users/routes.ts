import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { getProfile } from "./controller.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";

const router = Router();

router.get("/profile", authMiddleware, roleMiddleware("USER"), getProfile);

export default router;
