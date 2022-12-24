import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RowAndColInput } from './dto/row-and-col.input';
import { SerialportsService } from './serialports.service';
// import { allPorts, getSystemStatus } from './serialportsInstances';

@Resolver()
export class SerialportsResolver {
  constructor(private serialportsService: SerialportsService) { }
  @Query(() => Boolean)
  testPort() {
    // this.serialportsService.writeRandomColor();

    // getSystemStatus(allPorts[0]);

    return true;
  }

  @Mutation(() => Boolean)
  blinkLocation(
    @Args('input') input: RowAndColInput,
  ): Promise<Boolean> {
    return this.serialportsService.blinkLocation(input);
  }

}
