import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientInput } from './dto/create-patient.input';
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

  // TODO rethink this => cannot directly update patientNum
  // async update(
  //   id: string,
  //   input: UpdatePatientInput,
  // ): Promise<PatientResponse> {
  //   const patient = await this.findOneById(id);

  //   if (!patient)
  //     return {
  //       errors: [{ field: 'Patient', message: 'Cannot find the patient' }],
  //     };
  //   const updatedPatient = { ...patient, hosNum: input.hosNum };
  //   const newPatient = await this.patientsRepository.save(updatedPatient);
  //   return { patient: newPatient };
  // }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
