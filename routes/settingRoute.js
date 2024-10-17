import express from "express";
import { getSetting, updateSetting } from "../controllers/settingController.js";

export const settingRoute = express.Router();


settingRoute.get("/", getSetting)
settingRoute.put("/", updateSetting)