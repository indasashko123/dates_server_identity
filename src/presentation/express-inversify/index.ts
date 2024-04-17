import { mainConfig } from '../../config';
import cookieParser from "cookie-parser";
import express from 'express';
import cors from "cors";

import { connectDatabase, } from '../../database';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';

import { container } from './containers';
import { ErrorMiddleware } from '../middlewares';

const server = new InversifyExpressServer(container);
const port = mainConfig.server.port;

server.setConfig((app) => {
 app.use(express.json());
 app.use(cookieParser());
 app.use(cors());
 app.use(ErrorMiddleware);
});

export const start = () => {
    server.build().listen(port, async () => {
        try {
        await connectDatabase();
        console.log(`Server is running at ${port}`);
        } catch(e) {
        console.log(e);
        }
    });
}