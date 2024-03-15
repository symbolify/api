import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { AuthModule } from '../auth/auth.module';
import { TodoService } from './todo.service';
import { todoProviders } from './todo.providers';

@Module({
  controllers: [TodoController],
  providers: [
    TodoService,
    ...todoProviders
  ],
  imports: [AuthModule]
})
export class TodoModule {}
