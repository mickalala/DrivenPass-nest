import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardsRepository } from './cards.repository';
import { User } from '@prisma/client';
import Cryptr from 'cryptr';

@Injectable()
export class CardsService {
  private cryptr: Cryptr

  constructor(private readonly cardsRepository: CardsRepository) {
    const Cryptr = require('cryptr');
    this.cryptr = new Cryptr('myTotallySecretKey', { pbkdf2Iterations: 10000, saltLength: 10 });
  }

  async create(body: CreateCardDto, user: User) {
    body.password = this.cryptr.encrypt(body.password)
    body.securityCode = this.cryptr.encrypt(body.securityCode)

    await this.findWithTitle(body.title, user.id)
    return await this.cardsRepository.create(body, user)
  }

  async findWithTitle(title: string, userId: number) {
    const titleInUse = await this.cardsRepository.findwithTitle(title, userId)
    if (titleInUse) throw new ConflictException('title alredy in use by user.')
  }

  async findAll(user: User) {
    const cards = await this.cardsRepository.findAll(user.id);
    return cards.map(({ password, securityCode }) => {
      return {
        ...cards,
        password: this.cryptr.decrypt(password),
        securityCode: this.cryptr.decrypt(securityCode)
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  async remove(id: number, user: User) {
    return await this.cardsRepository.delete(id, user.id)
  }
}
