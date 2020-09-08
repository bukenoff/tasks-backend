import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({
    summary:
      'Get all projects to the user who is a team member of that project',
  })
  getProjects(): Promise<any> {
    return this.projectsService.getProjects();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a project with specified id' })
  getProjectById() {}

  @Post()
  @ApiOperation({ summary: 'Create a project' })
  createProject() {}

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a task with specified id' })
  updateProject() {}

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a project with specified id' })
  deleteProject() {}
}
