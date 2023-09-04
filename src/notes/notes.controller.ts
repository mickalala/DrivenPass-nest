import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from 'src/decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @User() user: UserPrisma) {
    return this.notesService.create(createNoteDto, user);
  }

  @Get()
  findAll(@User() user: UserPrisma) {
    return this.notesService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    return this.notesService.findOne(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    return this.notesService.remove(+id, user);
  }
}
