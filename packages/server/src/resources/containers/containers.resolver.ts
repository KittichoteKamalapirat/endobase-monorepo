import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContainersService } from './containers.service';
import { CreateContainerInput } from './dto/create-container.input';
import { Container } from './entities/container.entity';

@Resolver(() => Container)
export class ContainersResolver {
  constructor(private readonly containersService: ContainersService) {}

  @Mutation(() => Container)
  createContainer(
    @Args('createContainerInput') createContainerInput: CreateContainerInput,
  ) {
    return this.containersService.create(createContainerInput);
  }

  @Query(() => [Container], { name: 'containers' })
  findAll() {
    return this.containersService.findAll();
  }

  @Query(() => Container, { name: 'container' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.containersService.findOne(id);
  }

  // @Mutation(() => Container)
  // updateContainer(
  //   @Args('updateContainerInput') updateContainerInput: UpdateContainerInput,
  // ) {
  //   return this.containersService.updateStats(updateContainerInput);
  // }

  @Mutation(() => Container)
  removeContainer(@Args('id', { type: () => Int }) id: number) {
    return this.containersService.remove(id);
  }
}
