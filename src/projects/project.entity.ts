import {
  Entity,
  Unique,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Task } from 'src/tasks/task.entity';

@Entity()
@Unique(['title'])
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  created_at: string;

  @OneToMany(
    type => Task,
    task => task.project,
    { eager: true },
  )
  tasks: Task[];
}
