import { Test, TestingModule } from '@nestjs/testing';
import { SerialportsService } from './serialports.service';

describe('SerialportsService', () => {
  let service: SerialportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SerialportsService],
    }).compile();

    service = module.get<SerialportsService>(SerialportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
