import { Mutation, Resolver } from '@nestjs/graphql';
import BooleanResponse from '../endos/dto/boolean-response.input';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => BooleanResponse)
  deleteAllData() {
    return this.adminService.deleteAllData();
  }

  @Mutation(() => BooleanResponse)
  populateAllData() {
    return this.adminService.populateAllData();
  }
}
