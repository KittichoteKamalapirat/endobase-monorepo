import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import BooleanResponse from '../endos/dto/boolean-response.input';
import { ContainersService } from './containers.service';
import ContainerResponse from './dto/container-response';
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
  findOne(@Args('id', { type: () => String }) id: string) {
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

  @Mutation(() => ContainerResponse)
  turnLightsOff(
    @Args('id', { type: () => String }) id: string,
  ): Promise<ContainerResponse> {
    return this.containersService.turnLightsOff(id);
  }

  @Mutation(() => ContainerResponse)
  turnLightsOn(
    @Args('id', { type: () => String }) id: string,
  ): Promise<ContainerResponse> {
    return this.containersService.turnLightsOn(id);
  }
}
