import express from "express"

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
const upload = multer({ storage: storage }).fields([
  {"name": "profilePicture"},
  {"name": "homeImage"},
  {"name": "billImage"},
  {"name": "paySheetImage"},
  {"name": "signatureImage"},
])

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createCustomer } from "../controllers/customerController.js"

export const customerRouter = express.Router();



customerRouter.post("/create", upload,createCustomer);
customerRouter.post("/update");


customerRouter.get("/all-users");
customerRouter.get("/:id");





