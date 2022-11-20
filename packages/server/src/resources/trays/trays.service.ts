import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async create(input: CreateTrayInput): Promise<Tray> {
    const newTray = this.traysRepository.create(input);
    return this.traysRepository.save(newTray);
  }

  async findAll() {
    const trays = await this.traysRepository.find({
      relations: ['container', 'endo'],
    });

    return trays;
  }

  async findEmptyTrays() {
    // find trays that tray.endo is null
    const trays = await this.traysRepository.find({
      relations: ['container', 'endo'],
    });

    const emptyTrays = trays.filter((tray) => !tray.endo);

    return emptyTrays;
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
