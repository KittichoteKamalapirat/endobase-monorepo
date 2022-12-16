import { Test, TestingModule } from '@nestjs/testing';
import { EndoCronsResolver } from './endo-crons.resolver';

describe('EndoCronsResolver', () => {
  let resolver: EndoCronsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EndoCronsResolver],
    }).compile();

    resolver = module.get<EndoCronsResolver>(EndoCronsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
