import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './create-todo.dto';
import { Todo } from './todo.entity';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('todo')
export class TodoController {

  constructor(private readonly todoService: TodoService) {}

  @Get()
  todoHello(): Promise<string> {
    return Promise.reject('Hello from todo module');
  }

  @Post('create')
  create(@Body() createTodoDTO: CreateTodoDto): Promise<Todo> {
    return this.todoService.createTodo(createTodoDTO);
  }

  @Get('get')
  getTodos(): Promise<Todo[]> {
    return this.todoService.getTodos();
  }

}
