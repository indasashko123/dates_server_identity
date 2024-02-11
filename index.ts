import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from 'dotenv';

import { ErrorMiddleware } from './src/components/middlewares';
import { sync } from './src/database'; 
import { mainConfig } from './src/config';
import { router } from './src/components/routers';


dotenv.config();
const app = express();
const port = mainConfig.server.port;



app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('',router);
app.use(ErrorMiddleware);


const start = async ()=> {
  try {
    app.listen(port);
      console.log(`Server is running at ${mainConfig.server.host}`);
    await sync();
  } catch(e) {
    console.log(e);
  }
}

start();
