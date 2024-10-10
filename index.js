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
import { customerRouter } from './routes/customerRoute.js';
import { areaRouter } from './routes/areaRoute.js';
import { guarantorRouter } from './routes/guarantorRoute.js';
import logger from './config/logger.js';
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const port = process.env.PORT || 3000

dbConnect()
const app = express()

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors(
  {
    origin: '*',
  }
))

app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});


app.get('/', (req, res) => {
  logger.info('Handling root request');
  res.send('app is running');
});
app.use("/api/user", userRouter);
app.use("/api/customer", customerRouter);
app.use("/api/area", areaRouter);
app.use("/api/guarantor", guarantorRouter);


app.get('/api/image/:image', (req, res) => {
  res.sendFile(path.join(__dirname, 'uploads/profile', req.params.image));
});

app.use(notFound)
app.use(handleError)


app.listen(port, () => {
  logger.info(`listening on port ${port}`);
})