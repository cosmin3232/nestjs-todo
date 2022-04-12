import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo.entity';
import { User } from 'src/entities/user.entity';
import { GetFilterDto } from '../dto/get-filter.dto';
import { CreateTodoDto } from '../dto/todo.dto';
import { TodoRepository } from '../repositories/todo.repository';

@Injectable()
export class TodoService {

    constructor(@InjectRepository(TodoRepository) private todoRepository: TodoRepository) {}

    public async getTodos(filterDto: GetFilterDto, user: User): Promise<Array<Todo>> {
        return await this.todoRepository.getTodos(filterDto, user);
    }

    public async getTodoById(id: string, user: User): Promise<Todo> {

        const foundElement =  await this.todoRepository.findOne({ where: { id, user }});

        if (!foundElement) {
            throw new NotFoundException(`Todo with ID ${id} not found!`);
        }

        return foundElement;
    }

    public async createTodo(body: CreateTodoDto, user: User): Promise<Todo> {
        return this.todoRepository.createTodo(body, user);
    }

    public async updateTodo(id: string, body: CreateTodoDto, user: User): Promise<Todo> {
        const todo = await this.getTodoById(id, user);
        todo.text = body.text;
        todo.date = body.date;
        todo.status = body.status;

        await this.todoRepository.save(todo);

        return todo;
    }

    public async deleteTodo(id: string, user: User): Promise<void> {
        const deleteResult = await this.todoRepository.delete(id);
    
        if (deleteResult.affected === 0) {
            throw new NotFoundException(`Todo with ID ${id} not found!`);
        }
    }

}
