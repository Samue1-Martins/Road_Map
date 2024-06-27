import { Router } from "express";
import { userRoute } from "../routes/user.routes.js";

const routes = Router();

routes.use(userRoute);

export { routes }