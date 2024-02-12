import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

import { ErrorMiddleware } from './components/middlewares';
import { sync } from '../../database';
import { mainConfig } from '../../config';
import { router } from "./components"



const app = express();
const port = mainConfig.server.port;


app.use((req : Request, res : Response, next : NextFunction) => {
  console.log(
      "*****************************************************************************************************\n" +
      `                                      URL IS  -   ${req.url}\n` + 
      "*****************************************************************************************************\n" );
  next();
})
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('',router);
app.use(ErrorMiddleware);



export const start = async ()=> {
  try {
    app.listen(port);
      console.log(`Server is running at ${mainConfig.server.host}`);
    await sync();
  } catch(e) {
    console.log(e);
  }
}

//start();
