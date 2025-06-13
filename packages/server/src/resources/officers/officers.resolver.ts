import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OfficersService } from './officers.service';
import { Officer } from './entities/officer.entity';
import { CreateOfficerInput } from './dto/create-officer.input';
import { UpdateOfficerInput } from './dto/update-officer.input';
import OfficerResponse from './dto/officer-response';
import BooleanResponse from '../endos/dto/boolean-response.input';

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

  @Query(() => Officer)
  officer(@Args('id') id: string) {
    return this.officersService.findOne(id);
  }

  @Mutation(() => OfficerResponse)
  updateOfficer(
    @Args('input')
    input: UpdateOfficerInput,
    // @Context() { req }: MyContext
  ) {
    return this.officersService.update(input.id, input);
  }

  @Mutation(() => BooleanResponse)
  deleteOfficer(@Args('id') id: string) {
    return this.officersService.remove(id);
  }
}
