import { Router } from "express";
import {
    createVideo,
    getAllVideos,
    getVideoByTitle,
    updateDurationVideo,
    updateTitle,
    updateTypeArchive,
    deleteVideo
} from "../controllers/video.controllers.js";

export const videoRoutes = Router();

videoRoutes.post("/new-video", createVideo);
videoRoutes.get("/all-videos", getAllVideos);
videoRoutes.get("/video-find-title", getVideoByTitle);
videoRoutes.patch("/update-title/:id", updateTitle);
videoRoutes.patch("/update-duration-video/:id", updateDurationVideo);
videoRoutes.patch("/update-type-archive/:id", updateTypeArchive);
videoRoutes.delete("/delete-video/:id", deleteVideo);