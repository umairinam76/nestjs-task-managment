import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
// import { EntityRepository } from 'typeorm';
import { TasksController } from './tasks.controller';
import { TasksReporsitory } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TasksReporsitory]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
