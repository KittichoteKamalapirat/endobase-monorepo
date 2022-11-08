import { Test, TestingModule } from '@nestjs/testing';
import { SerialportsResolver } from './serialports.resolver';

describe('SerialportsResolver', () => {
  let resolver: SerialportsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SerialportsResolver],
    }).compile();

    resolver = module.get<SerialportsResolver>(SerialportsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
