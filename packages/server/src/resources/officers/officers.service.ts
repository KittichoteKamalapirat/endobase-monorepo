import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfficerInput } from './dto/create-officer.input';
import { UpdateOfficerInput } from './dto/update-officer.input';
import { Officer } from './entities/officer.entity';

@Injectable()
export class OfficersService {
  @InjectRepository(Officer)
  private officersRepository: Repository<Officer>; // use database, make sure forFeature is in module

  create(input: CreateOfficerInput) {
    const newOfficer = this.officersRepository.create(input);
    return this.officersRepository.save(newOfficer);
  }

  findAll() {
    return `This action returns all officers`;
  }

  findOneById(id: string) {
    return this.officersRepository.findOneBy({ id });
  }

  async findOneByofficerNum(officerNum: string): Promise<Officer> {
    return this.officersRepository.findOneBy({ officerNum });
  }

  update(id: number, updateOfficerInput: UpdateOfficerInput) {
    return `This action updates a #${id} officer`;
  }

  remove(id: number) {
    return `This action removes a #${id} officer`;
  }
}
