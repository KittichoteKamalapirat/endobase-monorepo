import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SERIALPORTS_PROVIDER } from '../../constants';
import BooleanResponse from '../endos/dto/boolean-response.input';
import { SerialportsService } from '../serialports/serialports.service';
import { CreateContainerInput } from './dto/create-container.input';
import { UpdateContainerInput } from './dto/update-container.input';
import { ColType, Container } from './entities/container.entity';

@Injectable()
export class ContainersService {
  constructor(
    @InjectRepository(Container)
    private containersRepository: Repository<Container>,
    // @Inject(SERIALPORTS_PROVIDER) // TODO what is this => remove this line fix
    // private serialportsService: SerialportsService,
    @Inject(forwardRef(() => SerialportsService))
    private serialportsService: SerialportsService,
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
    return this.containersRepository.findOne({
      where: { id },
      relations: ['trays'],
    });
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

  async turnLightOff(id: string): Promise<BooleanResponse> {
    const container = await this.findOne(id);
    if (!container)
      return {
        errors: [
          {
            field: 'Container',
            message: 'Cannot find a container',
          },
        ],
      };

    console.log('11');
    // turn light off for every tray in that container
    console.log('this outside loop', this.serialportsService.turnLightOff);
    container.trays.map((tray) => {
      console.log('22');

      // because of forward ref?
      this.serialportsService.turnLightOff({
        col: container.col,
        row: tray.row,
        // endoStatus: 'ready',
      });

      console.log('this inside loop', this.serialportsService.turnLightOff);

      console.log('33');
    }, 'xxx');
    console.log('44');

    // this.se
  }
}
