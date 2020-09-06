import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  getTasks(user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(user);
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Omit<Task, 'creator'>> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id: Task['id'], user: User): Promise<Task> {
    const task_by_id = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!task_by_id) {
      throw new NotFoundException();
    }

    return task_by_id;
  }

  async deleteTask(id: Task['id'], user: User): Promise<Task['id']> {
    const result = await this.taskRepository.delete({ id, creatorId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return id;
  }

  async updateTask(
    id: Task['id'],
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const updates = Object.entries(updateTaskDto);

    const task_to_update = await this.getTaskById(id, user);

    updates.forEach(update => {
      const [property, value] = update;

      task_to_update[property] = value;
    });

    await task_to_update.save();
    return task_to_update;
  }
}
