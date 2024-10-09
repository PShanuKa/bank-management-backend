import express from "express"
import { getAllUser, getAUser, loginUser, registerUser, updateUser} from "../controllers/userController.js";
import multer from "multer"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
1
const upload = multer({ storage: storage }).single('file')

import { authMiddleware } from "../middlewares/authMiddleware.js";

export const userRouter = express.Router();


// all post routes
userRouter.post("/register", upload, registerUser);
userRouter.post("/login", loginUser);

// all get routes
userRouter.get("/all-users", authMiddleware,  getAllUser);
userRouter.get("/:id", getAUser);

// all put routes
userRouter.put("/update-profile", authMiddleware, updateUser);


// all delete routes