import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksModule } from './tasks/tasks.module';
import { typeorm_config } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeorm_config),
    ConfigModule.forRoot(),
    TasksModule,
    AuthModule,
    ProjectsModule,
  ],
})
export class AppModule {}
