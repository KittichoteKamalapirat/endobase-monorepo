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
  useEndo(@Args({ name: 'id', type: () => String }) id: string): Promise<Endo> {
    console.log('id', id);
    return this.endosService.useEndo(id);
  }

  //   @ResolveField()
  //   async posts(@Parent() author: Author) {
  //     const { id } = author;
  //     return this.postsService.findAll({ authorId: id });
  //   }
}
