import { Test, TestingModule } from '@nestjs/testing';
import { TraysResolver } from './trays.resolver';
import { TraysService } from './trays.service';

describe('TraysResolver', () => {
  let resolver: TraysResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TraysResolver, TraysService],
    }).compile();

    resolver = module.get<TraysResolver>(TraysResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
