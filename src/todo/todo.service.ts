import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './create-todo.dto';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async createTodo(createDto: CreateTodoDto): Promise<Todo> {
    const { name, description } = createDto;

    const todo = new Todo();
    todo.name = name;
    todo.description = description;

    await todo.save();

    return todo;
  }

  getTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }
}
