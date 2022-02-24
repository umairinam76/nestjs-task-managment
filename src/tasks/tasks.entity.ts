// import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task {
  constructor(private JwtStrategy: JwtStrategy) {}
  // for unique id generate in db
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // it will generate colume in db
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: TaskStatus;
  @ManyToOne((_type) => User, (user) => user.task, { eager: false })
  user: User;
}
// const { ...data } = Task;
// console.log(data);
