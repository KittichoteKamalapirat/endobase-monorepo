import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Endo, ENDO_STATUS, ENDO_STATUS_OBJ } from './entities/endo.entity';
import { Repository } from 'typeorm';
import { CreateEndoInput } from './dto/create-endo.input';

import { SessionsService } from '../sessions/sessions.service';
// import { port1 } from '../serialports/serialportsInstances';

@Injectable()
export class EndosService {
  constructor(
    @InjectRepository(Endo)
    private endosRepository: Repository<Endo>, // use database, make sure forFeature is in module
    private sessionsService: SessionsService,
  ) {}

  async findAll(): Promise<Endo[]> {
    const endos = await this.endosRepository.find({
      relations: ['tray', 'tray.container'],
      // loadRelationIds: true,
    });
    console.log('hi');
    console.log('endos in service', endos);
    return endos;
  }

  async findOne(id: string): Promise<Endo> {
    return this.endosRepository.findOneBy({ id });
  }

  async createEndo(input: CreateEndoInput): Promise<Endo> {
    const newEndo = this.endosRepository.create(input);
    return this.endosRepository.save(newEndo);
  }

  async remove(id: string): Promise<void> {
    await this.endosRepository.delete(id);
  }

  // update LED color
  // update endo status
  async pickEndo(id: string): Promise<Endo | Error> {
    // TODO add validation (like if the session is created already, don't do it)
    // TODO check by session with this endoId and null
    // update endoscope status from ready => being_used
    const endo = await this.endosRepository.findOneBy({ id });
    console.log('endo', endo);

    if (!endo) return new Error('Cannot find the endoscope');

    const existingSession = await this.findCurrentSessionByEndoId(id);
    console.log('existing session', existingSession);
    if (existingSession) return new Error('This endoscope is already in use'); // TODO handle this

    // create a session
    await this.createSession(id);

    // port1.write(':L00(255,000,000)\r\n)', (err) => {
    //   // if (error) console.log(error?.message);
    //   if (err) {
    //     return console.log('Error on write: ', err.message);
    //   }
    //   console.log('wrote');
    // });

    const pickedEndo = this.endosRepository.save({
      ...endo,
      status: ENDO_STATUS_OBJ.BEING_USED,
    });
    console.log('picked endo', pickedEndo);
    return pickedEndo;
  }

  async updateStatus(id: string, status: ENDO_STATUS): Promise<Endo | Error> {
    const endo = await this.endosRepository.findOneBy({ id });

    if (!endo) return new Error('No endoscope found');

    console.log('endo', endo);
    const updatedEndo = { ...endo, status };

    return this.endosRepository.save(updatedEndo);
  }
  createSession(endoId: string) {
    return this.sessionsService.create({ endoId });
  }

  findCurrentSessionByEndoId(endoId: string) {
    // current session = status = ongoing
    // supposed to be only one
    // what if there are many

    return this.sessionsService.findCurrentSessionByEndoId(endoId);
  }
}
