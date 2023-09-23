import * as express from "express";
import { Express, Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import { StatusCodes } from "http-status-codes";
import { yellowBright } from "colorette";
import * as cors from "cors";

import dataSource from "./model/connect";
import { BASE } from "./constant/router.path";
import TaskRoute from "./router/task.route";
import 'dotenv/config';

dataSource.initialize().then((dataSource) => {
    const app: Express = express();

    const taskRoute: TaskRoute = new TaskRoute();

    app.use(bodyParser.json());
    app.use(cors());
    app.use(BASE, taskRoute.getRoute());

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: err.message
        })
    })

    const port: number = parseInt(process.env.SERVER_PORT || '4000');
    app.listen(port, () => {
        console.log(yellowBright(`Application is running on port ${port}`))
    })
}).catch((err) => console.log(err))