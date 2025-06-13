import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SessionsService } from './sessions.service';
import { Session } from './entities/session.entity';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';
import { UpdateSessionPatientInput } from './dto/update-session-patient.input';

@Resolver(() => Session)
export class SessionsResolver {
  constructor(private readonly sessionsService: SessionsService) {}

  @Mutation(() => Session)
  createSession(@Args('input') input: CreateSessionInput) {
    return this.sessionsService.create(input);
  }

  @Query(() => [Session], { name: 'sessions' })
  findAll() {
    return this.sessionsService.findAll();
  }

  @Query(() => Session, { name: 'session' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.sessionsService.findOne(id);
  }

  @Mutation(() => Session)
  updateSession(
    @Args('updateSessionInput') updateSessionInput: UpdateSessionInput,
  ) {
    return this.sessionsService.update(
      updateSessionInput.id,
      updateSessionInput,
    );
  }

  @Mutation(() => Session)
  updateSessionPatient(@Args('input') input: UpdateSessionPatientInput) {
    return this.sessionsService.updatePatientSession(input.id, input);
  }

  @Mutation(() => Session)
  removeSession(@Args('id', { type: () => String }) id: string) {
    return this.sessionsService.remove(id);
  }
}
