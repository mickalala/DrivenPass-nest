import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { User as Userprisma } from '@prisma/client';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/authguard';

@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) { }

  @Post()
  create(@Body() createCredentialDto: CreateCredentialDto, @User() user: Userprisma) {
    return this.credentialsService.create(createCredentialDto, user);
  }

  @Get()
  findAll(@User() user: Userprisma) {
    return this.credentialsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: Userprisma) {
    return this.credentialsService.findOne(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: Userprisma) {
    return this.credentialsService.remove(+id, user);
  }
}
