import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {};

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.createUser(authCredentialDto);
    }
 
    async signIn(authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
        const { username, password } = authCredentialDto;
        const user = await this.userRepository.findOne({ where: { username } });

        if(user && await bcrypt.compare(password, user.password)) {
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken};
        } else {
            throw new BadRequestException('Invalid credentials');
        }
    }

}
