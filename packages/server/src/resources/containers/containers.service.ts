import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { columnToArduinoIdMapper } from 'src/constants';
import { Repository } from 'typeorm';
import { CONTAINER_TYPE_VALUES } from '../../types/CONTAINER_TYPE';
import { SerialportsService } from '../serialports/serialports.service';
import ContainerResponse from './dto/container-response';
import { CreateContainerInput } from './dto/create-container.input';
import { UpdateContainerStatsInput } from './dto/update-container-stats.input';
import { Container } from './entities/container.entity';

@Injectable()
export class ContainersService {
  constructor(
    @InjectRepository(Container)
    private containersRepository: Repository<Container>,
    // @Inject(SERIALPORTS_PROVIDER) // TODO what is this => remove this line fix
    // private serialportsService: SerialportsService,
    @Inject(forwardRef(() => SerialportsService))
    private serialportsService: SerialportsService,
  ) { }

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
      relations: ['trays', 'trays.endo'], // need this in turnLightsOn
    });
  }

  // col = A, B, C
  async findOneByContainerChar(col: CONTAINER_TYPE_VALUES): Promise<Container> {
    return this.containersRepository.findOneBy({ col });
  }

  async updateStats({ col, currTemp, currHum }: UpdateContainerStatsInput) {
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

  async updateContainer(id: string, input: Container): Promise<Container> {
    const updatedInput = { ...input };
    const updatedContainer = await this.containersRepository.save(updatedInput);

    return updatedContainer;
  }

  async turnLightsOff(id: string): Promise<ContainerResponse> {
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

    const updatedInput = { ...container, lightsAreOn: false };
    const updatedContainer = await this.updateContainer(
      container.id,
      updatedInput,
    );

    console.log(1);

    // // turn light off for every tray in that container
    // container.trays.map((tray) => {
    //   // because of forward ref?
    //   this.serialportsService.turnLightsOff({
    //     col: container.col,
    //     row: tray.row,
    //     // endoStatus: 'ready',
    //   });
    // });

    console.log(2);

    const syncTurnlightsOff = async () => {
      for (let tray of container.trays) {
        console.log(111);

        const result = await this.serialportsService.turnLightsOff({
          col: container.col,
          row: tray.row,
          // endoStatus: 'ready',
        });
        console.log('-------------------------------------');

        return result

      }
    }
    try {
      console.log(3);
      const result = await syncTurnlightsOff()
      console.log('resulttt', result);

      console.log(4);
    } catch (error) {
      console.log(error);
    }
    return {
      container: updatedContainer,
    };
  }

  async turnLightsOn(id: string): Promise<ContainerResponse> {
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
    // update db
    const updatedInput = { ...container, lightsAreOn: true };
    const updatedContainer = await this.updateContainer(
      container.id,
      updatedInput,
    );

    // turn light off for every tray in that container

    // tray.endo could be undefined when there are empty trays
    container.trays.map((tray) =>
      this.serialportsService.turnLightsOn({
        col: container.col,
        row: tray.row,
        status: tray.endo?.status || 'no_endo', // make light black for a tray with no endo
      }),
    );



    const syncTurnlightsOn = async () => {
      for (let tray of container.trays) {
        await this.serialportsService.turnLightsOn({
          col: container.col,
          row: tray.row,
          status: tray.endo?.status || 'no_endo',
        });

      }
    }
    try {
      await syncTurnlightsOn()
    } catch (error) {
      console.log(error);
    }



    return {
      container: updatedContainer,
    };
  }
}
