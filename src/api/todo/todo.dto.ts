import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    public text: string;

    @IsString()
    public date: string;

    @IsNumber()
    public status: number;
}