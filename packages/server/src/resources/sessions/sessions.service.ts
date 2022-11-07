import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientsService } from '../patients/patients.service';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';
import { Session, SESSION_STATUS } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>, // use database, make sure forFeature is in module
    private patientsService: PatientsService,
  ) {}

  create(input: CreateSessionInput) {
    const newSession = this.sessionsRepository.create(input);
    return this.sessionsRepository.save(newSession);
  }

  findAll() {
    return this.sessionsRepository.find({
      relations: ['actions', 'actions.officer'],
    });
  }

  async findOne(id: string) {
    const session = await this.sessionsRepository.findOne({
      where: { id },
      relations: ['actions', 'actions.officer'],
    });
    console.log('session', session);

    return session;
  }

  findByEndoId(endoId: string) {
    const session = this.sessionsRepository.find({ where: { endoId } });
    console.log('session', session);
    return session;
  }

  findCurrentSessionByEndoId(endoId: string) {
    return this.sessionsRepository.findOne({
      where: { endoId, status: SESSION_STATUS.ONGOING },
    });
  }

  async update(id: string, updateSessionInput: UpdateSessionInput) {
    try {
      // if update
      const session = await this.sessionsRepository.findOneBy({ id });
      const newSession = { ...session, ...updateSessionInput };
      console.log('new session', newSession);
      await this.sessionsRepository.save(newSession);
      return newSession;
    } catch (error) {
      return new Error(error);
    }
  }

  async updatePatient(id: string, patientHN: string) {
    // use patientId if this hosNum is already in the db
    // otherwise create one
    try {
      const existingPatient = await this.patientsService.findOneByHN(patientHN);

      let newPatient = null;
      if (!existingPatient) {
        newPatient = await this.patientsService.create({
          hosNum: patientHN,
        });
      }
      const session = await this.sessionsRepository.findOneBy({ id });
      const newSession = { ...session, patientId: newPatient.id };
      await this.sessionsRepository.save(newSession);
      return newSession;
    } catch (error) {
      return new Error(error);
    }
  }

  updateSessionPatientId(id: string, updateSessionInput: UpdateSessionInput) {
    // TODO
    return `This action updates a #${id} session`;
  }

  remove(id: string) {
    return `This action removes a #${id} session`;
  }
}
