import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientsService } from './patients.service';
import { Patient } from './entities/patient.entity';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';
import PatientResponse from './dto/patient-response';

@Resolver(() => Patient)
export class PatientsResolver {
  constructor(private readonly patientsService: PatientsService) {}

  @Mutation(() => Patient)
  createPatient(
    @Args('createPatientInput') createPatientInput: CreatePatientInput,
  ) {
    return this.patientsService.create(createPatientInput);
  }

  @Query(() => [Patient], { name: 'patients' })
  findAll() {
    return this.patientsService.findAll();
  }

  @Query(() => Patient, { name: 'patient' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.patientsService.findOneById(id);
  }

  // TODO rethink
  // @Mutation(() => PatientResponse)
  // updatePatient(
  //   @Args('id') id: string,
  //   @Args('input') input: UpdatePatientInput,
  // ): Promise<PatientResponse> {
  //   return this.patientsService.update(id, input);
  // }

  @Mutation(() => Patient)
  removePatient(@Args('id', { type: () => Int }) id: number) {
    return this.patientsService.remove(id);
  }
}
