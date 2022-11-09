import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEndoInput } from './dto/create-endo.input';
import { Endo, ENDO_STATUS, ENDO_STATUS_OBJ } from './entities/endo.entity';

import { SerialportsService } from '../serialports/serialports.service';
import { SessionsService } from '../sessions/sessions.service';
// import { port1 } from '../serialports/serialportsInstances';

@Injectable()
export class EndosService {
  constructor(
    @InjectRepository(Endo)
    private endosRepository: Repository<Endo>, // use database, make sure forFeature is in module
    private sessionsService: SessionsService,
    private serialportsService: SerialportsService,
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
    return this.endosRepository.findOne({
      where: { id },
      relations: ['tray', 'tray.container'],
    });
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
    const endo = await this.findOne(id);
    console.log('endo', endo);

    if (!endo) return new Error('Cannot find the endoscope');

    const existingSession = await this.findCurrentSessionByEndoId(id);
    console.log('existing session', existingSession);
    if (existingSession) return new Error('This endoscope is already in use'); // TODO handle this

    // create a session
    await this.createSession(id);

    // write color
    this.serialportsService.writeColor({
      col: endo.tray.container.col,
      row: endo.tray.row,
      endoStatus: ENDO_STATUS_OBJ.BEING_USED,
    });

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
