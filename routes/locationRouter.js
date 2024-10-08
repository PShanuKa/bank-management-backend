import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

export const locationRouter = express.Router();

//create locations
locationRouter.post('/create', authMiddleware, createLocation)