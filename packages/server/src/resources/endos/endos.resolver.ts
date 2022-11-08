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

  @ResolveField(() => String, { nullable: true })
  async currentSessionId(@Root() endo: Endo): Promise<string | null> {
    const curSession = await this.endosService.findCurrentSessionByEndoId(
      endo.id,
    );

    if (!curSession) return null;
    return curSession.id;
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
    return this.endosService.pickEndo(id);
  }

  //   @ResolveField()
  //   async posts(@Parent() author: Author) {
  //     const { id } = author;
  //     return this.postsService.findAll({ authorId: id });
  //   }
}
