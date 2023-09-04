import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { CredentialsRepository } from './credentials.repository';
import { User } from '@prisma/client';
import Cryptr from 'cryptr';

@Injectable()
export class CredentialsService {
  private cryptr: Cryptr;
  constructor(private readonly credentalsRepository: CredentialsRepository) {
    const Cryptr = require('cryptr');
    this.cryptr = new Cryptr('myTotallySecretKey', { pbkdf2Iterations: 10000, saltLength: 10 });
  }

  async create(body: CreateCredentialDto, user: User) {
    await this.findByTitle(body, user.id);

    body.password = this.cryptr.encrypt(body.password);

    await this.credentalsRepository.createCredential(body, user);

  }

  async findByTitle(body: CreateCredentialDto, userId: number) {
    const credential = await this.credentalsRepository.findByTitle(body.title, userId);
    if (credential) throw new ConflictException('Title alredy in use.')
  }

  async findAll(user: User) {
    const credentials = await this.credentalsRepository.getUserCredentials(user)
    return credentials.map(({ password }) => {
      return { ...credentials, password: this.cryptr.decrypt(password) }
    })
  }

  async findOne(id: number, user: User) {
    const { id: userId } = user;

    const credential = await this.credentalsRepository.findeById(id);
    if (!credential) throw new NotFoundException('This credential not exist.')
    if (credential.userId !== userId) throw new UnauthorizedException();
    return { ...credential, password: this.cryptr.decrypt(credential.password) }
  }

  async remove(id: number, user: User) {
    await this.findOne(id, user)
    await this.credentalsRepository.delete(id, user);
    return true;
  }
}
