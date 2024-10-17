import express from "express";
import {
  createArea,
  getAllAreas,
  updateArea,
  deleteArea,
} from "../controllers/areaController.js";

export const areaRouter = express.Router();

// Route to create a new area
areaRouter.post("/create", createArea);

// Route to get all areas
areaRouter.get("/all", getAllAreas);

// Route to update an area by ID
areaRouter.put("/update/:id", updateArea);

// Route to delete an area by ID
areaRouter.delete("/delete/:id", deleteArea);
