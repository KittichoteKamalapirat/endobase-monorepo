import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import BooleanResponse from '../endos/dto/boolean-response.input';
import { CreateRepairRequestInput } from './dto/create-repair-request.input';
import RepairRequestResponse from './dto/repair-request-response';
import { UpdateRepairRequestInput } from './dto/update-repair-request.input';
import { RepairRequest } from './entities/repair-request.entity';
import { RepairRequestService } from './repair-request.service';

@Resolver(() => RepairRequest)
export class RepairRequestResolver {
  constructor(private readonly repairRequestService: RepairRequestService) {}

  @Mutation(() => RepairRequestResponse)
  createRepairRequest(@Args('input') input: CreateRepairRequestInput) {
    return this.repairRequestService.create(input);
}

  @Query(() => [RepairRequest])
  repairRequests() {
    return this.repairRequestService.findAll();
  }

  @Query(() => [RepairRequest])
  repairRequestsByEndo(@Args('endoId') endoId: string) {
    return this.repairRequestService.findAllByEndoId(endoId);
  }

  @Query(() => RepairRequest)
  repairRequest(@Args('id') id: string) {
    return this.repairRequestService.findOne(id);
  }


  @Mutation(() => RepairRequestResponse)
  updateRepairRequest(@Args('input') input: UpdateRepairRequestInput) {
    return this.repairRequestService.update(input.id, input);
  }

  @Mutation(() => BooleanResponse)
  removeRepairRequest(@Args('id') id: string) {
    return this.repairRequestService.remove(id);
  }
}
