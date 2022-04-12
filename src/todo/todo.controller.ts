import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Todo } from 'src/entities/todo.entity';
import { User } from 'src/entities/user.entity';
import { GetFilterDto } from '../dto/get-filter.dto';
import { CreateTodoDto } from '../dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
    @Inject(TodoService)
    private readonly todoService: TodoService;

    @Get()
    public getTodos(
        @Query() filterDto: GetFilterDto,
        @GetUser() user: User
        ): Promise<Array<Todo>> {
        return this.todoService.getTodos(filterDto, user);
    }

    @Get('/:id')
    public getTodoById(
        @Param('id') id: string,
        @GetUser() user: User): Promise<Todo> {
        return this.todoService.getTodoById(id, user);
    }

    @Post()
    public createTodo(
        @Body() body: CreateTodoDto,
        @GetUser() user: User
    ): Promise<Todo> {
        return this.todoService.createTodo(body, user);
    }

    @Put(':id')
    public updateTodo(
        @Param('id') id: string,
        @Body() body: CreateTodoDto,
        @GetUser() user: User
        ): Promise<Todo> {
        return this.todoService.updateTodo(id, body, user);
    }

    @Delete(':id')
    public deleteTodo(
        @Param('id') id: string,
        @GetUser() user: User
        ): Promise<void> {
        return this.todoService.deleteTodo(id, user);
    }
}
