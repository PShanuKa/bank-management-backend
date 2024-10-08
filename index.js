import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from "dotenv";
import { userRouter } from './routes/userRoute.js';
import { handleError, notFound } from './middlewares/errorHandler.js';
import { dbConnect } from './config/dbConnect.js';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

dbConnect()
const app = express()

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/user", userRouter);


app.get('/api/image/:image', (req, res) => {
  res.sendFile(path.join(__dirname, 'uploads/profile', req.params.image));
});

// app.use(notFound)
// app.use(handleError)


const port = 3000

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})