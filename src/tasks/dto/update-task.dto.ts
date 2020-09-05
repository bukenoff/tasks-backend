import { Task } from '../task.entity';

export class UpdateTaskDto {
  id: Task['id'];
  title?: Task['title'];
  description?: Task['description'];
  status?: Task['status'];
}
