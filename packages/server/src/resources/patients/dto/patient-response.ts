import { Field, ObjectType } from '@nestjs/graphql';
import { FieldError } from '../../../types/field-error';
import { Patient } from '../entities/patient.entity';

@ObjectType()
class PatientResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Patient, { nullable: true })
  patient?: Patient;
}

export default PatientResponse;
