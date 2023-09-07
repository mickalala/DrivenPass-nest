import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EraseService } from './erase.service';
import { AuthGuard } from 'src/guards/authguard';

@UseGuards(AuthGuard)
@Controller('erase')
export class EraseController {
  constructor(private readonly eraseService: EraseService) { }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() password: string) {
    return this.eraseService.remove(+id, password);
  }
}
