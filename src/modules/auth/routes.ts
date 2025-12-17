import { Router } from "express";
import { register } from "./controller.js";
import { registerSchema } from "./schema.js";
import { validateSchema } from "../../middlewares/validate.middleware.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);

export default router;
