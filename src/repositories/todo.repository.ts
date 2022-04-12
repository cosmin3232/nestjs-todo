import { User } from "src/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { GetFilterDto } from "../dto/get-filter.dto";
import { CreateTodoDto } from "../dto/todo.dto";
import { Todo } from "../entities/todo.entity";

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
    public async getTodos(filterDto: GetFilterDto, user: User): Promise<Array<Todo>> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('todo');
        query.where({  user });

        if (status) {
            query.andWhere('todo.status = :status', { status });
        }
        if (search) {
            query.andWhere(
                '(LOWER(todo.text) LIKE LOWER(:search) OR LOWER(todo.date) LIKE LOWER(:search))',
                { search: `%${search}%`},
            );
        }
        const todos = await query.getMany();
        return todos;
    }


    public async createTodo(body: CreateTodoDto, user: User): Promise<Todo> {
        const {text, date, status} = body;
        const todo = this.create({
            text,
            date,
            status,
            user,
        });

        await this.save(todo);
        return todo;
    }
}