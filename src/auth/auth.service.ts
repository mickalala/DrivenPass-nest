import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateSignIn } from './dto/create-signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {

    private EXPIRATION_TIME: "8 days";
    private ISSUER: "mimi";
    private AUDIENCE: "users";

    constructor(
        private readonly jwtService: JwtService,
        private readonly authRepository: AuthRepository
    ) { }

    async createUser(body: CreateSignIn) {
        const user = await this.authRepository.getUserByEmail(body.email);
        if (user) throw new ConflictException('Email already in use.');

        return await this.authRepository.createUser(body);
    };

    async signInUser(body: CreateSignIn) {
        const { email, password } = body;
        const user = await this.authRepository.getUserByEmail(email);
        if (!user) throw new UnauthorizedException('Email or password not valid.');

        const validPassword = bcrypt.compare(password, user.password);
        if (!validPassword) throw new UnauthorizedException('Email or password not valid.');

        return this.createToken(user)
    };

    private async createToken(user: User) {
        const { id, email } = user;

        const token = this.jwtService.sign({ email }, {
            expiresIn: this.EXPIRATION_TIME,
            subject: String(id),
            issuer: this.ISSUER,
            audience: this.AUDIENCE
        });
        return { token };
    };

    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                audience: this.AUDIENCE,
                issuer: this.ISSUER
            })
            return data;
        } catch (error) {
            console.log(error)
            throw new BadRequestException();
        }
    }

}
