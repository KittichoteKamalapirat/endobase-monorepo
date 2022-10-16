import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OfficersService } from './officers.service';
import { Officer } from './entities/officer.entity';
import { CreateOfficerInput } from './dto/create-officer.input';
import { UpdateOfficerInput } from './dto/update-officer.input';

@Resolver(() => Officer)
export class OfficersResolver {
  constructor(private readonly officersService: OfficersService) {}

  @Mutation(() => Officer)
  createOfficer(@Args('createOfficerInput') createOfficerInput: CreateOfficerInput) {
    return this.officersService.create(createOfficerInput);
  }

  @Query(() => [Officer], { name: 'officers' })
  findAll() {
    return this.officersService.findAll();
  }

  @Query(() => Officer, { name: 'officer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.officersService.findOne(id);
  }

  @Mutation(() => Officer)
  updateOfficer(@Args('updateOfficerInput') updateOfficerInput: UpdateOfficerInput) {
    return this.officersService.update(updateOfficerInput.id, updateOfficerInput);
  }

  @Mutation(() => Officer)
  removeOfficer(@Args('id', { type: () => Int }) id: number) {
    return this.officersService.remove(id);
  }
}
