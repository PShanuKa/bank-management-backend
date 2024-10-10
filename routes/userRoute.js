import express from "express"
import { getAllUser, getAUser, loginUser, registerUser, updateUser} from "../controllers/userController.js";



import { authMiddleware } from "../middlewares/authMiddleware.js";

export const userRouter = express.Router();


// all post routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// all get routes
userRouter.get("/all-users",  getAllUser);
userRouter.get("/:id", getAUser);

// all put routes
userRouter.post("/update/:id", updateUser);


// all delete routes