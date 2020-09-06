import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from 'src/tasks/tasks.service';
import { TaskRepository } from '../task.repository';

const mockTaskRepository = () => ({});

describe('TasksService', () => {
  let service: TasksService;
  let repository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TaskRepository,
          useFactory: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
