import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeorm_config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'myusername',
  password: 'mypassword',
  database: 'mydatabase',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
