import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEndoInput } from './dto/create-endo.input';
import { Endo } from './entities/endo.entity';
import { EndosService } from './endos.service';

@Resolver(() => Endo)
export class EndosResolver {
  constructor(private endosService: EndosService) {}

  @Query(() => [Endo], { name: 'endos' })
  getEndos(): Promise<Endo[]> {
    return this.endosService.findAll();
  }

  @Query(() => Endo, { name: 'endo' })
  getEndo(@Args('id', { type: () => String }) id: string): Promise<Endo> {
    return this.endosService.findOne(id);
  }

  @Mutation(() => Endo)
  createEndo(
    @Args({ name: 'input', type: () => CreateEndoInput })
    input: CreateEndoInput,
  ): Promise<Endo> {
    return this.endosService.createEndo(input);
  }

  @Mutation(() => Endo)
  async useEndo(
    @Args({ name: 'id', type: () => String }) id: string,
  ): Promise<Endo | Error> {
    // TODO add validation (like if the session is created already, don't do it)
    // TODO check by session with this endoId and null

    const endo = await this.endosService.findOne(id);
    if (!endo) return new Error('Cannot find the endoscope');
    const existingSessions = await this.endosService.findSessionByEndoId(id);
    if (existingSessions.patientId === null)
      return new Error('This endoscope is alrealdy in use');
    const session = await this.endosService.createSession(id);
    console.log('session', session);

    return this.endosService.useEndo(id);
  }

  //   @ResolveField()
  //   async posts(@Parent() author: Author) {
  //     const { id } = author;
  //     return this.postsService.findAll({ authorId: id });
  //   }
}
