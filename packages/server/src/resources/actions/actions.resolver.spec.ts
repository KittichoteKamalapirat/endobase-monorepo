import { Test, TestingModule } from '@nestjs/testing';
import { ActionsResolver } from './actions.resolver';
import { ActionsService } from './actions.service';

describe('ActionsResolver', () => {
  let resolver: ActionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionsResolver, ActionsService],
    }).compile();

    resolver = module.get<ActionsResolver>(ActionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
