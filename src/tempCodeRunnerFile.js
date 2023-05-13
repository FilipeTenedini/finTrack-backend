import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongoDb from './config/database.js';
import router from './routes/index.routes.js';
import startKeepAlive from './utils/keepAlive.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

connectMongoDb();

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`);
  startKeepAlive();
});
