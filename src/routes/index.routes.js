import { Router } from "express";
import { userRoute } from "../routes/user.routes.js";
import { roadMapRoutes } from "./roadMap.routes.js";

const routes = Router();

routes.use(userRoute);
routes.use(roadMapRoutes)

export { routes }