import { Test, TestingModule } from '@nestjs/testing';
import { SerialportsController } from './serialports.controller';
import { SerialportsService } from './serialports.service';

describe('SerialportsController', () => {
  let controller: SerialportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SerialportsController],
      providers: [SerialportsService],
    }).compile();

    controller = module.get<SerialportsController>(SerialportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
