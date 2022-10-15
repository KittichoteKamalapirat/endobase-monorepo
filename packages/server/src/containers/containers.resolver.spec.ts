import { Test, TestingModule } from '@nestjs/testing';
import { ContainersResolver } from './containers.resolver';
import { ContainersService } from './containers.service';

describe('ContainersResolver', () => {
  let resolver: ContainersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContainersResolver, ContainersService],
    }).compile();

    resolver = module.get<ContainersResolver>(ContainersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
