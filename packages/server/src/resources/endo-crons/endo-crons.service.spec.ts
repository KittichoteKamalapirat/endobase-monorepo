import { Test, TestingModule } from '@nestjs/testing';
import { EndoCronsService } from './endo-crons.service';

describe('EndoCronsService', () => {
  let service: EndoCronsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EndoCronsService],
    }).compile();

    service = module.get<EndoCronsService>(EndoCronsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
