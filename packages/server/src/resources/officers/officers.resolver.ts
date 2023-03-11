import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OfficersService } from './officers.service';
import { Officer } from './entities/officer.entity';
import { CreateOfficerInput } from './dto/create-officer.input';
import { UpdateOfficerInput } from './dto/update-officer.input';
import OfficerResponse from './dto/officer-response';

@Resolver(() => Officer)
export class OfficersResolver {
  constructor(private readonly officersService: OfficersService) {}

  @Mutation(() => OfficerResponse)
  createOfficer(@Args('input') input: CreateOfficerInput) {
    return this.officersService.create(input);
  }

  @Query(() => [Officer], { name: 'officers' })
  findAll() {
    return this.officersService.findAll();
  }

  @Mutation(() => Officer)
  updateOfficer(
    @Args('updateOfficerInput') updateOfficerInput: UpdateOfficerInput,
  ) {
    return this.officersService.update(
      updateOfficerInput.id,
      updateOfficerInput,
    );
  }

  @Mutation(() => Officer)
  removeOfficer(@Args('id', { type: () => Int }) id: number) {
    return this.officersService.remove(id);
  }
}
