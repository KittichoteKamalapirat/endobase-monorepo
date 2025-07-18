import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RowAndColInput } from './dto/row-and-col.input';
import { SerialportsService } from './serialports.service';
// import { allPorts, getSystemStatus } from './serialportsInstances';

@Resolver()
export class SerialportsResolver {
  constructor(private serialportsService: SerialportsService) { }

}