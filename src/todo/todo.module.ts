import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TodoController],
  providers: [],
  imports: [AuthModule]
})
export class TodoModule {}
