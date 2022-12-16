import { Query, Resolver } from '@nestjs/graphql';
import { SerialportsService } from './serialports.service';
// import { allPorts, getSystemStatus } from './serialportsInstances';

@Resolver()
export class SerialportsResolver {
  constructor(private serialportsService: SerialportsService) {}
  @Query(() => Boolean)
  testPort() {
    // this.serialportsService.writeRandomColor();

    // getSystemStatus(allPorts[0]);

    return true;
  }
}
