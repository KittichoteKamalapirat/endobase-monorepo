import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { CreateEndoInput } from './dto/create-endo.input';
import { Endo } from './entities/endo.entity';
import { EndosService } from './endos.service';

@Resolver(() => Endo)
export class EndosResolver {
  constructor(private endosService: EndosService) {}

  @ResolveField(() => String)
  position(@Root() endo: Endo): string {
    const row = endo.tray.row;
    const col = endo.tray.container.col;
    return `${col}${row}`;
  }

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
  async pickEndo(
    @Args({ name: 'id', type: () => String }) id: string,
  ): Promise<Endo | Error> {
    // TODO add validation (like if the session is created already, don't do it)
    // TODO check by session with this endoId and null

    const endo = await this.endosService.findOne(id);
    if (!endo) return new Error('Cannot find the endoscope');
    const existingSession = await this.endosService.findCurrentSessionByEndoId(
      id,
    );
    if (existingSession) return;
    // if (existingSessions.patientId === null)
    //   return new Error('This endoscope is alrealdy in use');

    // create a session
    await this.endosService.createSession(id);

    return this.endosService.pickEndo(id);
  }

  //   @ResolveField()
  //   async posts(@Parent() author: Author) {
  //     const { id } = author;
  //     return this.postsService.findAll({ authorId: id });
  //   }
}
