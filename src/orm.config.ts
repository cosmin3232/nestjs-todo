import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'superuser',
    database: 'test_db',
    synchronize: true,
    entities: ['dist/**/*.entitiy{.ts,.js} '],

}