import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EraseRepository {
    constructor(private readonly prisma: PrismaService) { }

    deleteAll(userId: number) {
        this.prisma.card.deleteMany({ where: { userId } })
        this.prisma.note.deleteMany({ where: { userId } })
        this.prisma.credetial.deleteMany({ where: { userId } })
        this.prisma.user.delete({ where: { id: userId } })
        return true;
    }
}