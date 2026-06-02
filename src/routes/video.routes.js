import { Router } from "express";
import {
    createVideo,
    getVideos,
    updateVideo,
    deleteVideo
} from "../controllers/video.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";

export const videoRoutes = Router();

videoRoutes.post("/videos", authenticateToken, createVideo);
videoRoutes.get("/videos", authenticateToken, getVideos);
videoRoutes.get("/videos/:id", authenticateToken, getVideos);
videoRoutes.patch("/videos/:id", authenticateToken, updateVideo);
videoRoutes.delete("/videos/:id", authenticateToken, deleteVideo);