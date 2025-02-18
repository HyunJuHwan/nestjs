import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: `${process.env.JWT_SECRET}`,
        });
    };

    async validate(payload) {
        const { username } = payload;
        const user: User = await this.userRepository.findOne({ where: { username } });

        if(!user) throw new UnauthorizedException();

        return user;
    }
}