import { Router } from "express";
import { userRoute } from "../routes/user.routes.js";
import { roadMapRoutes } from "./roadMap.routes.js";
import { videoRoutes } from "./video.routes.js";

const routes = Router();

routes.use(userRoute);
routes.use(roadMapRoutes);
routes.use(videoRoutes);

export { routes }