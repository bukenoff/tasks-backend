import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks to the user who created them' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({
    description: 'Tasks succesfully created',
    type: Task,
    isArray: true,
  })
  getTasks(@GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getTasks(user);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a task with specified id' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: Task })
  getTaskById(
    @Param('id', ParseIntPipe) id: Task['id'],
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiCreatedResponse({ type: Task })
  @ApiBearerAuth('JWT-auth')
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Omit<Task, 'creator'>> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a task with specified id' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: Task['id'] })
  deleteTask(
    @Param('id', ParseIntPipe) id: Task['id'],
    @GetUser() user: User,
  ): Promise<Task['id']> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Updates task with specified id' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: Task })
  updateTask(
    @Param('id', ParseIntPipe) id: Task['id'],
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, updateTaskDto, user);
  }
}
