import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { User } from "@prisma/client";

@Injectable()
export class CardsRepository {
    constructor(private readonly prisma: PrismaService) { }
    create(body: CreateCardDto, user: User) {
        return this.prisma.card.create({ data: { ...body, user: { connect: user } } })
    }

    findwithTitle(title: string, userId: number) {
        return this.prisma.card.findUnique({
            where: { title_userId: { title: title, userId: userId } }
        })
    }

    findAll(id: number) {
        return this.prisma.card.findMany({ 
            where: { userId: id } })
    }

    delete(id: number, userId: number) {
        return this.prisma.card.delete({
            where: { id, userId: userId }
        })
    }
}
// 