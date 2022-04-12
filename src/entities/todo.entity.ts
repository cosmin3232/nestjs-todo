import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    public id: number;

    @Column()
    public text: string;

    @Column()
    public date: string;

    @Column()
    public status: number;

    @ManyToOne((_type) => User, (user) => user.todos, { eager: false })
    @Exclude({ toPlainOnly: true })
    public user: User;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;
}