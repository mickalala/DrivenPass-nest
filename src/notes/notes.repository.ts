import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { User } from "@prisma/client";
import { UpdateNoteDto } from "./dto/update-note.dto";

@Injectable()
export class NotesRepository {
    constructor(private readonly prisma: PrismaService) { }

    createNote(body: CreateNoteDto, user: User) {
        return this.prisma.note.create({
            data: {
                ...body,
                user: { connect: user },
            }
        })
    }

    findUsersNotes(user: User) {
        return this.prisma.note.findMany({ where: { user: user } })
    }

    findNoteById(id: number) {
        return this.prisma.note.findUnique({ where: { id } })
    }

    delete(id: number, user: User) {
        return this.prisma.note.delete({
            where:
                { id, user: user }
        })
    }

    update(id: number, body: UpdateNoteDto, user: User) {
        return this.prisma.note.update({
            data: body,
            where: { id, user: user }
        })
    }

    findByTitle(body: CreateNoteDto, userId: number) {
        return this.prisma.note.findUnique({
            where: { title_userId: { title: body.title, userId: userId } }
        })
    };
}