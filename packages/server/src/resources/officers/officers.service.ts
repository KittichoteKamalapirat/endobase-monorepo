import { Injectable } from '@nestjs/common';
import { CreateOfficerInput } from './dto/create-officer.input';
import { UpdateOfficerInput } from './dto/update-officer.input';

@Injectable()
export class OfficersService {
  create(createOfficerInput: CreateOfficerInput) {
    return 'This action adds a new officer';
  }

  findAll() {
    return `This action returns all officers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} officer`;
  }

  update(id: number, updateOfficerInput: UpdateOfficerInput) {
    return `This action updates a #${id} officer`;
  }

  remove(id: number) {
    return `This action removes a #${id} officer`;
  }
}
