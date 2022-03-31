import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { CreateTodoDto } from './todo.dto';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    @Inject(TodoService)
    private readonly todoService: TodoService;

    @Get()
    public getTodos(): Promise<Array<Todo>> {
        return this.todoService.getTodos();
    }

    @Post()
    public createTodo(@Body() body: CreateTodoDto): Promise<Todo> {
        return this.todoService.createTodo(body);
    }

    @Put(':id')
    public updateTodo(@Param('id') id: number | string, @Body() body: CreateTodoDto): Promise<Todo> {
        return this.todoService.updateTodo(id, body);
    }

    @Delete(':id')
    public deleteTodo(@Param('id') id: number | string): Promise<Todo> {
        return this.todoService.deleteTodo(id);
    }
}
