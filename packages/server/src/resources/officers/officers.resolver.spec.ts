import { Test, TestingModule } from '@nestjs/testing';
import { OfficersResolver } from './officers.resolver';
import { OfficersService } from './officers.service';

describe('OfficersResolver', () => {
  let resolver: OfficersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfficersResolver, OfficersService],
    }).compile();

    resolver = module.get<OfficersResolver>(OfficersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
