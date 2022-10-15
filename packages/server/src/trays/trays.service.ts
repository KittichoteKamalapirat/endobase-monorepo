import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { CreateTrayInput } from './dto/create-tray.input';
import { UpdateTrayInput } from './dto/update-tray.input';
import { Tray } from './entities/tray.entity';

@Injectable()
export class TraysService {
  constructor(
    @InjectRepository(Tray)
    private traysRepository: Repository<Tray>,
  ) {}

  create(createTrayInput: CreateTrayInput) {
    return 'This action adds a new tray';
  }

  async findAll() {
    const trays = await this.traysRepository.find({
      relations: ['container'],
    });

    return trays;
  }

  async findOne(id: number) {
    return `This action returns a #${id} container`;
  }

  update(id: number, updateTrayInput: UpdateTrayInput) {
    return `This action updates a #${id} tray`;
  }

  remove(id: number) {
    return `This action removes a #${id} tray`;
  }
}
