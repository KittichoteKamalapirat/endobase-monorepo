import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Endo, ENDO_STATUS } from './endo.entity';
import { Repository } from 'typeorm';
import { CreateEndoInput } from './dto/create-endo.input';
import { port } from '../serialports/serialports.service';

@Injectable()
export class EndosService {
  constructor(
    @InjectRepository(Endo)
    private endosRepository: Repository<Endo>, // use database, make sure forFeature is in module
  ) {}

  async findAll(): Promise<Endo[]> {
    const endos = await this.endosRepository.find();
    console.log('endos in service', endos);
    return endos;
  }

  async findOne(id: string): Promise<Endo> {
    return this.endosRepository.findOneBy({ id });
  }

  async createEndo(input: CreateEndoInput): Promise<Endo> {
    console.log('input', input);
    const newEndo = this.endosRepository.create(input);
    console.log('newEndo', newEndo);
    return this.endosRepository.save(newEndo);
  }

  async remove(id: string): Promise<void> {
    await this.endosRepository.delete(id);
  }

  async useEndo(id: string): Promise<Endo> {
    const endo = await this.endosRepository.findOneBy({ id });

    port.write(':L00(255,000,000)\r\n)', (err) => {
      // if (error) console.log(error?.message);
      if (err) {
        return console.log('Error on write: ', err.message);
      }
      console.log('wrote');
    });
    return this.endosRepository.save({
      ...endo,
      status: ENDO_STATUS.BEING_USED,
    });
  }
}
