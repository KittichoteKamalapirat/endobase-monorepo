import { Test, TestingModule } from '@nestjs/testing';
import { EndoCronsResolver } from './endo-crons.resolver';
import { EndoCronsService } from './endo-crons.service';

describe('EndoCronsResolver', () => {
  let resolver: EndoCronsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EndoCronsResolver, EndoCronsService],
    }).compile();

    resolver = module.get<EndoCronsResolver>(EndoCronsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
