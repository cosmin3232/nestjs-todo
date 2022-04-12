import { IsOptional, IsString } from "class-validator";

export class GetFilterDto {
    @IsOptional()
    @IsString()
    public search?: string;

    @IsOptional()
    public status?: number;
}