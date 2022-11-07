import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  @InjectRepository(Patient)
  private patientsRepository: Repository<Patient>; // use database, make sure forFeature is in module

  create(input: CreatePatientInput) {
    const newSession = this.patientsRepository.create(input);
    return this.patientsRepository.save(newSession);
  }

  findAll() {
    return `This action returns all patients`;
  }

  async findOneById(id: string): Promise<Patient> {
    return this.patientsRepository.findOneBy({ id });
  }

  async findOneByHN(hosNum: string): Promise<Patient> {
    return this.patientsRepository.findOneBy({ hosNum });
  }

  update(id: number, updatePatientInput: UpdatePatientInput) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
