import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Global()
@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET
  }), PrismaModule],
  providers: [AuthService, AuthRepository],
  controllers: [AuthController],
  exports: [AuthService]
})

export class AuthModule { }
