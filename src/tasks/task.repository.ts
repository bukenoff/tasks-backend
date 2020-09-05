import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Omit<Task, 'creator'>> {
    const { title, priority } = createTaskDto;

    const new_task = new Task();

    new_task.title = title;
    new_task.priority = priority;
    new_task.description = '';
    new_task.status = 'new';
    new_task.creator = user;
    await new_task.save();

    delete new_task.creator; // no need to return user field in response

    return new_task;
  }

  async getTasks(user: User): Promise<Task[]> {
    const query = this.createQueryBuilder('task');

    query.where('task.creatorId = :creatorId', { creatorId: user.id });

    const tasks = await query.getMany();
    return tasks;
  }
}
