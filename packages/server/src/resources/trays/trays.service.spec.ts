import { Test, TestingModule } from '@nestjs/testing';
import { TraysService } from './trays.service';

describe('TraysService', () => {
  let service: TraysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TraysService],
    }).compile();

    service = module.get<TraysService>(TraysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
