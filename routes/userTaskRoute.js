import express from "express"
import { createTask, deleteTask, getAllUserTask, submitTask, updateTask } from "../controllers/userTaskController.js";


export const userTaskRouter = express.Router();



userTaskRouter.post("/create", createTask);


userTaskRouter.delete("/delete/:id", deleteTask );


userTaskRouter.put("/update/:id",updateTask );
userTaskRouter.put("/submit/:id",submitTask );


userTaskRouter.get("/all", getAllUserTask);
