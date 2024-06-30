import { Router } from "express"
import{
    createRoadMap, 
    getAllRoadMaps, 
    getRoadMapByTheme, 
    updateTheme, 
    updateDescription,
    updateLocal,
    updateSocialNetwork,
    deleteRoadMap 
} from "../controllers/roadMap.controller.js"

export const roadMapRoutes = Router();

roadMapRoutes.post("/new-roadMap", createRoadMap)
roadMapRoutes.get("/all-roadMaps", getAllRoadMaps)
roadMapRoutes.get("/roadMap-find-theme", getRoadMapByTheme)
roadMapRoutes.patch("/update-theme/:id", updateTheme)
roadMapRoutes.patch("/update-description/:id", updateDescription )
roadMapRoutes.patch("/update-local/:id", updateLocal)
roadMapRoutes.patch("/update-social-network/:id", updateSocialNetwork)
roadMapRoutes.delete("/delete-roadMap/:id", deleteRoadMap)
