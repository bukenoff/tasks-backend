import { EntityRepository, Repository } from 'typeorm';
import { Project } from './project.entity';

@EntityRepository(Project)
export class ProjectsRepository extends Repository<Project> {
  projects: Project[] = [];

  async getProjects(): Promise<Project[]> {
    return new Promise(resolve => resolve(this.projects));
  }

  async getProjectById(id: Project['id']): Promise<Project> {
    return new Promise(resolve =>
      resolve(this.projects.find(project => project.id === id)),
    );
  }

  async createProject(): Promise<any> {
    return new Promise(resolve => resolve(null));
  }

  async updateProject(): Promise<any> {
    return new Promise(resolve => resolve(null));
  }

  async deleteProject(): Promise<any> {
    return new Promise(resolve => resolve(null));
  }
}
