import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsRepository)
    private projectsRepository: ProjectsRepository,
  ) {}

  async getProjects(): Promise<any> {
    return this.projectsRepository.getProjects();
  }
}
