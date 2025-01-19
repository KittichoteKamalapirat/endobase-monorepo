import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { TraysService } from './trays.service';
import { Tray } from './entities/tray.entity';
import { CreateTrayInput } from './dto/create-tray.input';
import { UpdateTrayInput } from './dto/update-tray.input';

@Resolver(() => Tray)
export class TraysResolver {
  constructor(private readonly traysService: TraysService) {}

  @ResolveField(() => String)
  position(@Root() tray: Tray): string {
    const row = tray.row;
    const col = tray.container.col;
    return `${col}${row}`; // A1
  }

  @Mutation(() => Tray, { name: 'createTray' })
  createTray(@Args('input') input: CreateTrayInput) {
    return this.traysService.create(input);
  }

  @Query(() => [Tray], { name: 'trays' })
  findAll() {
    return this.traysService.findAll();
  }

  @Query(() => [Tray], { name: 'emptyTrays' })
  findEmptyTrays() {
    return this.traysService.findEmptyTrays();
  }

  @Query(() => Tray, { name: 'tray' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.traysService.findOne(id);
  }

  @Mutation(() => Tray)
  removeTray(@Args('id', { type: () => Int }) id: number) {
    return this.traysService.remove(id);
  }
}
