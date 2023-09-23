import { Router } from "express";
import TaskController from "../controller/task.controller";
import { TASK_ROUTE_PATH } from "../constant/router.path";

export default class TaskRoute {
    constructor() {

    }

    getRoute() {
        const taskRouter = Router();
        const taskController: TaskController = new TaskController();

        taskRouter.get(TASK_ROUTE_PATH.fetch, taskController.getTask);
        taskRouter.post(TASK_ROUTE_PATH.create, taskController.createTask);
        taskRouter.patch(TASK_ROUTE_PATH.edit, taskController.editTask);
        taskRouter.delete(TASK_ROUTE_PATH.delete, taskController.deleteTask);

        return taskRouter;
    }
}