import express from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createCustomer,
  getACustomer,
  getAllCustomer,
  searchCustomer,
  updateCustomer,
} from "../controllers/customerController.js";

export const customerRouter = express.Router();

customerRouter.post("/create", createCustomer);
customerRouter.put("/update/:id", updateCustomer);

customerRouter.get("/all-customers", getAllCustomer);
customerRouter.get('/search', searchCustomer);
customerRouter.get("/:id", getACustomer);

