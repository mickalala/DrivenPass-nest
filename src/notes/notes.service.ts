import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesRepository } from './notes.repository';
import { User } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) { }

  async create(body: CreateNoteDto, user: User) {
    const { id: userId } = user;
    await this.findByTitle(body, userId);
    return await this.notesRepository.createNote(body, user)

  }

  async findByTitle(body: CreateNoteDto, userId: number) {
    throw new Error('Method not implemented.');
  }

  async findAll(user: User) {
    return await this.notesRepository.findUsersNotes(user)
      ;
  }

  async findOne(id: number, user: User) {
    const { id: userId } = user;
    const note = await this.notesRepository.findNoteById(id);
    if (!note) throw new NotFoundException()
    if (note.userId !== userId) throw new ForbiddenException();
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, user: User) {
    const note = await this.findOne(id, user)

    return;
  }

  async remove(id: number, user: User) {
    await this.findOne(id, user)
    await this.notesRepository.delete(id, user)
    return true;
  }
}
