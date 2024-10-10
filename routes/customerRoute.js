import express from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createCustomer,
  getACustomer,
  getAllCustomer,
  updateCustomer,
} from "../controllers/customerController.js";

export const customerRouter = express.Router();

customerRouter.post("/create", createCustomer);
customerRouter.post("/update/:id", updateCustomer);

customerRouter.get("/all-customers", getAllCustomer);
customerRouter.get("/:id", getACustomer);
