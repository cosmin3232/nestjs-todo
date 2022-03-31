import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({type: 'text'})
    public text: string;

    @Column({type: 'text'})
    public date: string;

    @Column({type: 'int', nullable: false, default: 0})
    public status: number;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;
}