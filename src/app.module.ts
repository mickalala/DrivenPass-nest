import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CredentialsModule } from './credentials/credentials.module';
import { CardsModule } from './cards/cards.module';
import { NotesModule } from './notes/notes.module';
import { EraseModule } from './erase/erase.module';

@Module({
  imports: [PrismaModule, AuthModule, CredentialsModule, CardsModule, NotesModule, EraseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
