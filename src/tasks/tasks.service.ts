import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksReporsitory } from './tasks.repository';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
// import { create } from 'domain';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import { Task, TaskStatus } from './task-status.enum';
// import { v4 as uuid } from 'uuid';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import { NotFoundError } from 'rxjs';
// import { NotFoundError } from 'rxjs';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksReporsitory)
    private tasksRepository: TasksReporsitory,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }
  //   getAllTasks(): Task[] {
  //     const tasks = this.tasks;
  //     if (tasks.length === 0) {
  //       throw new NotFoundException('No data Found');
  //     }
  //     return this.tasks;
  //   }
  //   //logic for creating new task(same as function defined in express js controller file)
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
  // logic for geting task by id
  async getTaskbyid(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException('Task with id ${id} not found');
    }
    return found;
  }
  async deletetask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with this id ${id} not found`);
    }
    // return newdata;
  }
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskbyid(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
