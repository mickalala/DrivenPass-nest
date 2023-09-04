import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCredentialDto } from "./dto/create-credential.dto";
import { User } from "@prisma/client";

@Injectable()
export class CredentialsRepository {


    constructor(private readonly prisma: PrismaService) { }

    createCredential(body: CreateCredentialDto, user: User) {

        return this.prisma.credetial.create({ data: { ...body, user: { connect: user } } })
    }

    findByTitle(title: string, userId: number) {
        return this.prisma.credetial.findUnique({
            where: { title_userId: { title: title, userId: userId } }
        })
    }

    getUserCredentials(user: User) {
        return this.prisma.credetial.findMany({ where: { user: user } })
    }

    findeById(id: number) {
        return this.prisma.credetial.findUnique({ where: { id } })
    }

    delete(id: number, user: User) {
        return this.prisma.credetial.delete({ where: { id, user: user } })
    }
}