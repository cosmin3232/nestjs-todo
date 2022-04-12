import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/entities/user.entity";
import { JwtPayload } from "src/interfaces/jwt-payload.interface";
import { UsersRepository } from "../repositories/users.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ) {
        super({
            secretOrKey: 'randomSecret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    public async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user = await this.usersRepository.findOne({username});

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}