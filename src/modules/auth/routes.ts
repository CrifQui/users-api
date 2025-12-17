import { login, refresh, register } from "./controller.js";
import { loginSchema, refreshSchema, registerSchema } from "./schema.js";

import { Router } from "express";
import { validateSchema } from "../../middlewares/validate.middleware.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/refresh", validateSchema(refreshSchema), refresh);

export default router;
