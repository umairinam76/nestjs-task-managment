import {
  Body,
  // Body,
  Controller,
  Delete,
  Get,
  // Delete,
  // Get,
  Param,
  Post,
  Patch,
  // Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';
// import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { updatetaskstatusdto } from './dto/update-task-status.dto';
import { AuthGuard } from '@nestjs/passport';
// import { updatetaskstatusdto } from './dto/update-task-status.dto';
// import { filter } from 'rxjs';
// import { filter } from 'rxjs';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  // route for get all records
  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTaskswithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }
  // //route for get record by id
  @Get('/:id')
  @UseGuards(AuthGuard())
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskbyid(id);
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
  @Delete('/:id')
  deletebyid(@Param('id') id: string): Promise<void> {
    return this.tasksService.deletetask(id);
  }

  // //route for updating task status by using id
  @Patch('/:id/:status')
  updatetaskstatus(
    @Param('id') id: string,
    @Body() updatetaskstatusdto: updatetaskstatusdto,
  ): Promise<Task> {
    const { status } = updatetaskstatusdto;
    return this.tasksService.updateTaskStatus(id, status);
  }
  // //route for creating a new record
  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }
  // //rotue for deleting all record at one time
  // // @Delete()
  // // deletetask(): Task {
  // //   return this.tasksService;
  // // }
  // //route for deleting record by id
  // @Delete('/:id')
  // deleteTaskByid(@Param('id') id: string): void {
  //   return this.tasksService.deletetaskbyid(id);
  // }
  // //route for deleting all record at once
  // @Delete('')
  // deletealltask(): void {
  //   return this.tasksService.deleteallrecord();
}
