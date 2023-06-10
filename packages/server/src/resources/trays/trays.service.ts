import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContainersService } from '../containers/containers.service';
import { CreateTrayInput } from './dto/create-tray.input';
import { UpdateTrayInput } from './dto/update-tray.input';
import { RowType, Tray } from './entities/tray.entity';

@Injectable()
export class TraysService {
  constructor(
    @InjectRepository(Tray)
    private traysRepository: Repository<Tray>,
    private containersService: ContainersService,
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

  // for admin
  async removeAllRows() {
    try {
      const trays = await this.findAll();

      await Promise.all(
        trays.map((tray) => this.traysRepository.delete({ id: tray.id })),
      );
    } catch (error) {
      console.error('error remove trays', error);
    }
  }

  async populateRows() {
    try {
      const containers = await this.containersService.findAll();

      containers.map(async (container) => {
        const rows = Array.from({ length: 16 }, (_, i) => i + 1) as RowType[];
        await Promise.all(
          rows.map(async (row) => {
            const input = {
              containerId: container.id,
              row,
            };

            const newRow = this.traysRepository.create(input);
            return await this.traysRepository.save(newRow);
          }),
        );
      });
      return true;
    } catch (error) {
      console.error('error populating containers', error);
    }
  }
}
