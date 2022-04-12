import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from "./todo.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ unique: true })
    public username: string;

    @Column()
    public password: string;

    @OneToMany((_type) => Todo, (todo) => todo.user, { eager: true })
    public todos: Array<Todo>;
}