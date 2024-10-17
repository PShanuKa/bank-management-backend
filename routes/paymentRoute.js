import express from "express";
import { createPayment, deletePayment, getPayment } from "../controllers/paymentController.js";

export const paymentRouter = express.Router();


paymentRouter.post("/create" , createPayment);
paymentRouter.delete("/delete/:id", deletePayment);
paymentRouter.get('/:id', getPayment);



