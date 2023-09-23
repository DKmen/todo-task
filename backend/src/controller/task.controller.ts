import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import errorHandler from "../util/errorController";
import TaskService from "../service/task.service";
import TaskDto from "../constant/dto/task.dto";


export default class TaskController {

    private taskServices: TaskService;

    constructor() {
        this.taskServices = new TaskService();
    }

    createTask = errorHandler(async (req: Request<any, TaskDto>, res: Response, next: NextFunction) => {
        res.status(StatusCodes.OK).json({
            error: false,
            data: await this.taskServices.createTask(req.body)
        })
    });

    getTask = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
        res.status(StatusCodes.OK).json({
            error: false,
            data: await this.taskServices.getTask()
        })
    });

    deleteTask = errorHandler(async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        res.status(StatusCodes.OK).json({
            error: false,
            data: await this.taskServices.deleteTask(req.params.id)
        })
    });

    editTask = errorHandler(async (req: Request<{ id: string }, Partial<TaskDto>>, res: Response, next: NextFunction) => {
        res.status(StatusCodes.OK).json({
            error: false,
            data: await this.taskServices.editTask(req.params.id, req.body)
        })
    });
}