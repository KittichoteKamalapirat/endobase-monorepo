import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CONTAINER_TYPE_OBJ, LIGHT_COMMAND_TIMEOUT } from '../../constants';
import { FieldError } from '../../types/field-error';
import { CONTAINER_TYPE_VALUES } from '../../types/CONTAINER_TYPE';
import { SerialportsService } from '../serialports/serialports.service';
import ContainerResponse from './dto/container-response';
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

  create() {
    return 'This action adds a new container';
  }

  private delay(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  private async withTimeout<T>(
    operation: Promise<T>,
    timeoutMs: number,
    message: string,
  ): Promise<T> {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeout = setTimeout(() => reject(new Error(message)), timeoutMs);
    });

    try {
      return await Promise.race([operation, timeoutPromise]);
    } finally {
      if (timeout) clearTimeout(timeout);
    }
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

    const syncTurnLightsOff = async () => {
      const errors: FieldError[] = [];

      for (const tray of container.trays) {
        try {
          const didSync = await this.withTimeout(
            this.serialportsService.turnLightsOff({
              col: container.col,
              row: tray.row,
            }),
            LIGHT_COMMAND_TIMEOUT,
            `Timeout turning lights off for tray ${tray.row}`,
          );

          if (!didSync) throw new Error('Serial command failed');

          await this.delay(100);
        } catch (error) {
          console.error('syncTurnLightsOffLoop ', error);
          errors.push({
            field: 'Container',
            message: `Failed to turn lights off for tray ${tray.row}`,
          });
        }
      }

      return errors;
    };
    let errors: FieldError[] = [];
    try {
      errors = await syncTurnLightsOff();
    } catch (error) {
      console.error('syncTurnLightsOff', error);
    }
    return {
      container: updatedContainer,
      errors: errors.length > 0 ? errors : undefined,
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

    // turn light on for every tray in that container
    const syncTurnLightsOn = async () => {
      const errors: FieldError[] = [];

      for (const tray of container.trays) {
        if (!tray.endo) continue;

        try {
          const didSync = await this.withTimeout(
            this.serialportsService.turnLightsOn({
              col: container.col,
              row: tray.row,
              status: tray.endo?.status || 'no_endo',
            }),
            LIGHT_COMMAND_TIMEOUT,
            `Timeout turning lights on for tray ${tray.row}`,
          );

          if (!didSync) throw new Error('Serial command failed');

          await this.delay(100);
        } catch (error) {
          console.error('syncTurnLightsOnLoop ', error);
          errors.push({
            field: 'Container',
            message: `Failed to turn lights on for tray ${tray.row}`,
          });
        }
      }

      return errors;
    };
    let errors: FieldError[] = [];
    try {
      errors = await syncTurnLightsOn();
    } catch (error) {
      console.error('Error syncTurnLightsOn', error);
    }

    return {
      container: updatedContainer,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  async reconnectContainer(id: string): Promise<ContainerResponse> {
    const container = await this.findOne(id);
    if (!container) {
      return {
        errors: [{ field: 'Container', message: 'Cannot find a container' }],
      };
    }

    const success = await this.serialportsService.reconnectContainer(
      container.col,
    );

    if (!success) {
      return {
        errors: [
          {
            field: 'Container',
            message: `Failed to reconnect container ${container.col.toUpperCase()}`,
          },
        ],
      };
    }

    return { container };
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
          const col = key as CONTAINER_TYPE_VALUES;
          const existing = await this.findOneByContainerChar(col);
          if (existing) return existing;

          const newRow = this.containersRepository.create({ col });
          return await this.containersRepository.save(newRow);
        }),
      );
      return true;
    } catch (error) {
      console.error('error populating containers', error);
    }
  }
}
