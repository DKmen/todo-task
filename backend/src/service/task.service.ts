import { Equal, Repository } from "typeorm";
import TaskDto from "../constant/dto/task.dto";
import dataSource from "../model/connect";
import { Task } from "../model/task.model";

export default class TaskService {
    private taskRepo: Repository<Task>;

    constructor() {
        this.taskRepo = dataSource.getRepository<Task>(Task);
    }

    createTask = async (taskDto: TaskDto) => {
        const task = this.taskRepo.create();
        Object.keys(taskDto).forEach((key: string) => {
            task[key] = taskDto[key];
        })
        return await this.taskRepo.save(task);
    }

    deleteTask = async (id: string) => {
        return await this.taskRepo.delete({ id: Equal(id) });
    }

    getTask = async () => {
        return await this.taskRepo.find();
    }

    editTask = async (id: string, taskDto: Partial<TaskDto>) => {
        const task = await this.taskRepo.findOne({ where: { id: Equal(id) } });
        Object.keys(taskDto).forEach((key: string) => {
            task[key] = taskDto[key];
        })
        return await this.taskRepo.save(task);
    }
}