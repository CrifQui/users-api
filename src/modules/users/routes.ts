import {
    createUser,
    deleteUser,
    getProfile,
    getUser,
    getUsers,
    updateUser,
} from "./controller.js";
import { createUserSchema, updateUserSchema } from "./users.schema.js";

import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { validateSchema } from "../../middlewares/validate.middleware.js";

const router = Router();

router.get("/profile", authMiddleware, getProfile);
router.get("/", authMiddleware, roleMiddleware("ADMIN"), getUsers);
router.get("/:id", authMiddleware, roleMiddleware("ADMIN"), getUser);
router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    validateSchema(createUserSchema),
    createUser
);
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    validateSchema(updateUserSchema),
    updateUser
);
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), deleteUser);

export default router;
