import { Router } from "express";
import {
    createRoadMap,
    getRoadMaps,
    updateRoadMap,
    deleteRoadMap
} from "../controllers/roadMap.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

export const roadMapRoutes = Router();

roadMapRoutes.post("/roadmaps", authenticateToken, createRoadMap);
roadMapRoutes.get("/roadmaps", authenticateToken, getRoadMaps);
roadMapRoutes.get("/roadmaps/:id", authenticateToken, getRoadMaps);
roadMapRoutes.patch("/roadmaps/:id", authenticateToken, updateRoadMap);
roadMapRoutes.delete("/roadMaps/:id", authenticateToken, deleteRoadMap);