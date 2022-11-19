import { Pagination } from 'nestjs-typeorm-paginate';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ActionsService } from './actions.service';
import { Action } from './entities/action.entity';
// import { CreateActionInput } from './dto/create-action.input';
import { UpdateActionInput } from './dto/update-action.input';
import { CreateActionInput } from './dto/create-action.input';
import { PaginatedInput } from "../common/dto/import { InputType, Int, Field } from '@nestjs/PaginatedInput";
import { PaginatedActionOutput } from './dto/paginated-action.output';

@Resolver(() => Action)
export class ActionsResolver {
  constructor(private readonly actionsService: ActionsService) {}

  @Mutation(() => Action)
  createAction(@Args('input') input: CreateActionInput) {
    return this.actionsService.create(input);
  }

  @Query(() => [Action], { name: 'actions' })
  findAll() {
    return this.actionsService.findAll();
  }

  @Query(() => Action, { name: 'action' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.actionsService.findOne(id);
  }

  @Mutation(() => Action)
  updateAction(
    @Args('updateActionInput') updateActionInput: UpdateActionInput,
  ) {
    return this.actionsService.update(updateActionInput.id, updateActionInput);
  }

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
