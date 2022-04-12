import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TodoController } from './todo.controller';
import { TodoRepository } from '../repositories/todo.repository';
import { TodoService } from './todo.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([TodoRepository]),
        AuthModule
    ],
    controllers: [TodoController],
    providers: [TodoService]
})
export class TodoModule {}
