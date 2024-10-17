import express from "express";
import {
  createGuarantor,
  getAllGuarantors,
  updateGuarantor,
  deleteGuarantor,
  searchGuarantor,
} from "../controllers/guarantorController.js";

export const guarantorRouter = express.Router();

// Route to create a new guarantor
guarantorRouter.post("/create", createGuarantor);

// Route to get all guarantors
guarantorRouter.get("/all", getAllGuarantors);

// Route to update a guarantor by ID
guarantorRouter.put("/update/:id", updateGuarantor);

guarantorRouter.get('/search', searchGuarantor);

// Route to delete a guarantor by ID
guarantorRouter.delete("/delete/:id", deleteGuarantor);
