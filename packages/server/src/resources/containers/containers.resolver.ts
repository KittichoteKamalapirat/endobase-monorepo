import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContainersService } from './containers.service';
import { Container } from './entities/container.entity';
import { CreateContainerInput } from './dto/create-container.input';
import { UpdateContainerInput } from './dto/update-container.input';

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

  @Mutation(() => Container)
  updateContainer(
    @Args('updateContainerInput') updateContainerInput: UpdateContainerInput,
  ) {
    return this.containersService.update(
      updateContainerInput.id,
      updateContainerInput,
    );
  }

  @Mutation(() => Container)
  removeContainer(@Args('id', { type: () => Int }) id: number) {
    return this.containersService.remove(id);
  }
}
