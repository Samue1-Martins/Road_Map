import { Router } from "express";
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    controlLoginUser
} from "../controllers/user.controller.js";

export const userRoute = Router();

import { authenticateToken } from "../middleware/auth.middleware.js";

userRoute.post("/login", controlLoginUser);
userRoute.post("/users", createUser);

userRoute.get("/users", authenticateToken, getUsers);
userRoute.get("/users/:id", authenticateToken, getUserById);
userRoute.patch("/users/:id", authenticateToken, updateUser);
userRoute.delete("/users/:id", authenticateToken, deleteUser);