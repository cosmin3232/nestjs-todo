import { createParamDecorator } from "@nestjs/common";
import { User } from "src/entities/user.entity";

export const GetUser = createParamDecorator((_data, ctx): User => {
    const req = ctx.switchToHttp().getRequest();
    
    return req.user;
});