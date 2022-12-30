import { forwardRef, Inject } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { SerialportsService } from '../serialports/serialports.service';
import { ContainersService } from './containers.service';
import ContainerResponse from './dto/container-response';
import { CreateContainerInput } from './dto/create-container.input';
import { Container } from './entities/container.entity';

@Resolver(() => Container)
export class ContainersResolver {
  constructor(
    private readonly containersService: ContainersService,
    // private readonly serialportsService: SerialportsService,
    @Inject(forwardRef(() => SerialportsService))
    private serialportsService: SerialportsService,
  ) { }

  @ResolveField(() => Boolean)
  isConnected(@Root() container: Container): boolean {
    const col = container.col;
    return this.serialportsService.containerIsConnected(col);
  }

  @ResolveField(() => Boolean)
  isResponding(@Root() container: Container): boolean {
    const col = container.col;
    return this.serialportsService.containerIsResponding(col);
  }

  @Mutation(() => Container)
  createContainer(
    @Args('createContainerInput') createContainerInput: CreateContainerInput,
  ) {
    return this.containersService.create(createContainerInput);
  }

  @Query(() => [Container], { name: 'containers' })
  async findAll() {
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
