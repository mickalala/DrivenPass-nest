import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { EraseRepository } from './erase.repository';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class EraseService {
  constructor(
    private readonly eraseRepository: EraseRepository,
    private readonly authService: AuthService
  ) { }

  async remove(id: number, password: string) {
    const user = await this.authService.get(id)
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) throw new UnauthorizedException("Incorrect password!");

    return await this.eraseRepository.deleteAll(id);
  }
}
