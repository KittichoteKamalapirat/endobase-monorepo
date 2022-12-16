import { Query, Resolver } from '@nestjs/graphql';
import { EndoCronsService } from './endo-crons.service';
import { EndoCron } from './entities/endo-cron.entity';

@Resolver()
export class EndoCronsResolver {
  constructor(private readonly endoCronsService: EndoCronsService) {}

  @Query(() => [EndoCron])
  endoCronsInDb() {
    return this.endoCronsService.findAllInDb();
  }

  @Query(() => [String])
  endoCronsInMemory() {
    return this.endoCronsService.getTimeouts();
  }
}
