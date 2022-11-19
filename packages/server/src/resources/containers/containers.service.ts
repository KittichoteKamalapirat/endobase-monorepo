import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SerialPort } from 'serialport';
import { Repository } from 'typeorm';
import { SERIALPORTS_PROVIDER } from '../../constants';
import { CreateContainerInput } from './dto/create-container.input';
import { UpdateContainerInput } from './dto/update-container.input';
import { ColType, Container } from './entities/container.entity';

@Injectable()
export class ContainersService {
  constructor(
    @InjectRepository(Container)
    private containersRepository: Repository<Container>,
    @Inject(SERIALPORTS_PROVIDER)
    private serialports: { A: SerialPort; B: SerialPort; C: SerialPort },
  ) {}

  create(createContainerInput: CreateContainerInput) {
    return 'This action adds a new container';
  }

  async findAll() {
    const containers = await this.containersRepository.find({
      relations: ['trays'],
    });
    return containers;
  }

  findOne(id: string) {
    return this.containersRepository.findOneBy({ id });
  }

  // col = A, B, C
  async findOneByContainerChar(col: ColType): Promise<Container> {
    return this.containersRepository.findOneBy({ col });
  }

  async updateStats({ col, currTemp, currHum }: UpdateContainerInput) {
    const container = await this.containersRepository.findOne({
      where: { col },
    });

    if (!container) return new Error('Cannot find the container');
    const updatedContainer: Container = { ...container, currHum, currTemp };
    return this.containersRepository.save(updatedContainer);
  }

  remove(id: number) {
    return `This action removes a #${id} container`;
  }
}
