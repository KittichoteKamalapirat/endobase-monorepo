import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CONTAINER_TYPE_OBJ,
  CONTAINER_TYPE_VALUES,
} from '../../types/CONTAINER_TYPE';
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
    console.log('turnLightsOff')
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

    const syncTurnlightsOff = async () => {
      for (const tray of container.trays) {
        try {

          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 100 + 200) // 5 seconds timeout
          );

          await Promise.race([
            this.serialportsService.turnLightsOff({
            col: container.col,
            row: tray.row,
          }), 
          timeoutPromise]);
    
  
          await new Promise(resolve => setTimeout(resolve,100))
  
          // DON"T RETURN inside the loop => immediately get out of the loop
        } catch (error) {
          console.error('syncTurnlightsOffLoop ',error);
        }
        
      }
    };
    try {
      await syncTurnlightsOff();
    } catch (error) {
      console.error('syncTurnlightsOff',error);
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
    const syncTurnlightsOn = async () => {
      for (const tray of container.trays) {
       
        if (!tray.endo) continue

        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 100 + 200) // 5 seconds timeout
        );

        console.log('try to turn light for', container.col, tray.row, 'to', tray.endo?.status)
      

        await Promise.race([
          this.serialportsService.turnLightsOn({
            col: container.col,
            row: tray.row,
            status: tray.endo?.status || 'no_endo',
          }), 
        timeoutPromise]);


        console.log('success turn light for ', container.col, tray.row, 'to', tray.endo?.status)
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    };
    try {
      await syncTurnlightsOn();
    } catch (error) {
      console.error("Error syncTurnlightsOn", error);
    }

    console.log('turnLightsOn success')
    return {
      container: updatedContainer,
    };
  }

  // for admin
  async removeAllRows() {
    try {
      const containers = await this.findAll();

      await Promise.all(
        containers.map((container) =>
          this.containersRepository.delete({ id: container.id }),
        ),
      );
    } catch (error) {
      console.error('error remove containers', error);
    }
  }

  async populateRows() {
    try {
      await Promise.all(
        Object.keys(CONTAINER_TYPE_OBJ).map(async (key) => {
          const input = {
            col: key as CONTAINER_TYPE_VALUES,
          };

          const newRow = this.containersRepository.create(input);
          return await this.containersRepository.save(newRow);
        }),
      );
      return true;
    } catch (error) {
      console.error('error populating containers', error);
    }
  }
}
