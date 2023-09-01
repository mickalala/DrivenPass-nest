import { Injectable } from "@nestjs/common";
import { CreateSignUp } from "./dto/create-signUp.dto";
import * as bcrypt from "bcrypt"
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthRepository {
    private SALT = 10;
    constructor(private readonly prisma: PrismaService) { }
    async createUser(data: CreateSignUp) {
        return this.prisma.user.create({
            data: { ...data, password: bcrypt.hashSync(data.password, this.SALT) }
        })
    }

    async getUserByEmail(email: string) {
        return await this.prisma.user.findUnique({ where: { email } })
    }

}