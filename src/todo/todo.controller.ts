import { Body, Controller, Delete, Get, NotFoundException, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.gaurd';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoSrv: TodoService) {}
  @Get()
  async getAll() {
    const response: {status: string, data?: object[]} = {
      status: 'FAILED'
    };
    try {
      const data = await this.todoSrv.findAll();
      response.status = 'SUCCESS';
      response.data = data;
    }catch(e) {
      throw new NotFoundException();
    }
    return response;
  }

  @UseGuards(AuthGuard)
  @Post()
  async addItem(@Body() body: any) {
    const response = {
      status: 'FAILED',
      message: ''
    };
    const data = await this.todoSrv.addNew(body);
    if(data && data.id) {
      response.status = 'SUCCESS';
      response.message = 'Todo item created successfully.'
    }
    return response;
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateItem(@Body() body: {id: number, content: string}) {
    const response = {
      status: 'FAILED',
      message: ''
    };
    const data = await this.todoSrv.updateOne(body);
    if(data && data.id) {
      response.status = 'SUCCESS';
      response.message = 'Todo item updated successfully.'
    }
    return response;
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteItem(@Body() body: {id: number}) {
    const response = {
      status: 'FAILED',
      message: ''
    };
    const data = await this.todoSrv.deleteOne(body);
    if(data && data.id) {
      response.status = 'SUCCESS';
      response.message = 'Todo item deleted successfully.'
    }
    return response;
  }
}
