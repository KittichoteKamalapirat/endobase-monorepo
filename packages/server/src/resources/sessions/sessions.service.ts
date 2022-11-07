import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';
import { Session, SESSION_STATUS } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>, // use database, make sure forFeature is in module
  ) {}

  create(input: CreateSessionInput) {
    const newSession = this.sessionsRepository.create(input);
    return this.sessionsRepository.save(newSession);
  }

  findAll() {
    return `This action returns all sessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} session`;
  }

  findByEndoId(endoId: string) {
    return this.sessionsRepository.find({ where: { endoId } });
  }

  findCurrentSessionByEndoId(endoId: string) {
    return this.sessionsRepository.findOne({
      where: { endoId, status: SESSION_STATUS.ONGOING },
    });
  }

  update(id: number, updateSessionInput: UpdateSessionInput) {
    return `This action updates a #${id} session`;
  }

  updateSessionPatientId(id: number, updateSessionInput: UpdateSessionInput) {
    // TODO
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
