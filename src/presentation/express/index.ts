import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

import { ErrorMiddleware } from '../middlewares';
import { mainConfig } from '../../config';
import { router } from "./components"
import { connectDatabase, } from '../../database';
import Fingerprint from 'express-fingerprint';


const app = express();
const port = mainConfig.server.port;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('',router);
app.use(ErrorMiddleware);
app.use(Fingerprint());
app.get("/*",  (_,res)=> {return res.status(200).json({message : "ok"})});

export const start = async ()=> {
  try {
    app.listen(port);
    await connectDatabase();
    console.log(`Server is running at ${mainConfig.server.host}`);
    
  } catch(e) {
    console.log(e);
  }
}