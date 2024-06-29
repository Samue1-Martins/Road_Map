import { Router } from "express";
import {
    createUser,
    getAllUser,
    getUserByName,
    updatePassword,
    deleteUser
} from "../controllers/user.controller.js"

export const userRoute = Router();

userRoute.post("/new-user", createUser);
userRoute.get("/users", getAllUser);
userRoute.get("/user-find-name", getUserByName);
userRoute.patch("/update-password/:id", updatePassword);
userRoute.delete("/delete-user/:id", deleteUser);
