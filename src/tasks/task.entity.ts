import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { TaskStatus, TaskPriority } from './tasks.types';
import { User } from 'src/auth/user.entity';
import { Project } from 'src/projects/project.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  priority: TaskPriority;

  @Column()
  status: TaskStatus;

  @Column()
  created_at: string;

  @ManyToOne(
    type => User,
    user => user.tasks,
    { eager: false },
  )
  creator: User;

  @Column()
  creatorId: number;

  @ManyToOne(
    type => Project,
    project => project.tasks,
    { eager: false },
  )
  project: Project;

  @Column()
  projectId: number;
}
