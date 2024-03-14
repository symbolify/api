import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.gaurd';

@Controller('todo')
export class TodoController {
  @Get()
  getAll() {
    return "hello world";
  }

  @UseGuards(AuthGuard)
  @Post()
  addItem(@Body() data: any) {
    return data;
  }

}
