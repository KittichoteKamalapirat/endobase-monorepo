import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ActionsService } from './actions.service';
import { Action } from './entities/action.entity';
// import { CreateActionInput } from './dto/create-action.input';
import { PaginatedInput } from "../common/dto/import { InputType, Int, Field } from '@nestjs/PaginatedInput";
import { CreateActionInput } from './dto/create-action.input';
import { PaginatedActionOutput } from './dto/paginated-action.output';
import ActionResponse from './dto/action-response';

@Resolver(() => Action)
export class ActionsResolver {
  constructor(private readonly actionsService: ActionsService) {}

  @Mutation(() => ActionResponse)
  createAction(@Args('input') input: CreateActionInput) {
    return this.actionsService.create(input);
  }

  @Query(() => [Action], { name: 'actions' })
  findAll() {
    return this.actionsService.findAll();
  }

  // @Query(() => Action, { name: 'action' })
  // findOne(@Args('id', { type: () => Int }) id: string) {
  //   return this.actionsService.findOneById(id);
  // }

  // TODO rethink this => cannot directly udpate action num
  // @Mutation(() => ActionResponse)
  // updateAction(
  //   @Args('id') id: string,
  //   @Args('input') input: UpdateActionInput,
  // ): Promise<ActionResponse> {
  //   return this.actionsService.update(id, input);
  // }

  @Mutation(() => Action)
  removeAction(@Args('id', { type: () => Int }) id: number) {
    return this.actionsService.remove(id);
  }

  @Query(() => PaginatedActionOutput, { name: 'paginatedActions' })
  async findPaginatedActions(
    @Args('input', { type: () => PaginatedInput })
    input: PaginatedInput,
  ): Promise<Pagination<Action>> {
    const result = await this.actionsService.paginate(input);

    return result;
  }
}
