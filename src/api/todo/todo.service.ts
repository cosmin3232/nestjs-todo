import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
    @InjectRepository(Todo)
    private readonly repository: Repository<Todo>;

    public async getTodos(): Promise<Array<Todo>> {
        return await this.repository.find();
    }

    public async createTodo(body: CreateTodoDto): Promise<Todo> {
        const todo: Todo = new Todo();

        todo.text = body.text;
        todo.date = body.date;
        todo.status = body.status;

        return await this.repository.save(todo);
    }

    public async updateTodo(id: number | string, body: CreateTodoDto): Promise<Todo> {
        const todo: Todo = await this.repository.findOne(id);
        todo.text = body.text;
        todo.date = body.date;
        todo.status = body.status;

        return await this.repository.save(todo);
    }

    public async removeTodo(id: number | string): Promise<Todo> {
        const todo: Todo = await this.repository.findOne(id);

        return await this.repository.remove(todo);
    }

}
