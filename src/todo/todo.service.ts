import { Injectable, Inject } from '@nestjs/common';
// import { CreateCatDto } from './dto/create-cat.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: typeof Todo
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.findAll<Todo>({
      where: {status: true},
      attributes: [`id`, `content`],
      order: [['updatedAt', 'DESC']]
    });
  }

  async addNew(data: {content:string}) {
    const response = await this.todoRepository.create({
      content: data.content,
      status: true,
      createdAt: new Date(),
      updatedAT: new Date()
    });
    return response;
  }

  async updateOne(data: {id: number, content:string}) {
    const response = await this.todoRepository.findByPk(data.id);
    response.set({
      content: data.content,
      status: true,
      updatedAt: new Date()
    });
    return await response.save();
  }

  async deleteOne(data: {id: number}) {
    const response = await this.todoRepository.findByPk(data.id);
    response.set({
      status: false,
      updatedAt: new Date()
    });
    return await response.save();
  }
}