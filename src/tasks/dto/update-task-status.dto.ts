import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class updatetaskstatusdto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
