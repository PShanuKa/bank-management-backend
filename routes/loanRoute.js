import express from "express";
import {
  createLoan,
  getAllLoans,
  updateLoan,
  deleteLoan,
  actionLoan,
  getALoan,
  getReminderLoan,
} from "../controllers/loanController.js";

export const LoanRouter = express.Router();


LoanRouter.post("/create", createLoan);


LoanRouter.get("/all", getAllLoans);
LoanRouter.get("/reminder", getReminderLoan);

LoanRouter.put("/update/:id", updateLoan);
LoanRouter.put("/action/:id", actionLoan);


LoanRouter.delete("/delete/:id", deleteLoan);
LoanRouter.get("/:id", getALoan);

