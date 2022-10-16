import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContainerInput } from './dto/create-container.input';
import { UpdateContainerInput } from './dto/update-container.input';
import { Container } from './entities/container.entity';

@Injectable()
export class ContainersService {
  constructor(
    @InjectRepository(Container)
    private containersRepository: Repository<Container>,
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

  findOne(id: number) {
    return `This action returns a #${id} container`;
  }

  update(id: number, updateContainerInput: UpdateContainerInput) {
    return `This action updates a #${id} container`;
  }

  remove(id: number) {
    return `This action removes a #${id} container`;
  }
}
