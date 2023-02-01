import { Test, TestingModule } from '@nestjs/testing';
import { AbsenceRequestsController } from './absence-requests.controller';
import { AbsenceRequestsService } from './absence-requests.service';

describe('AbsenceRequestsController', () => {
  let controller: AbsenceRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbsenceRequestsController],
      providers: [AbsenceRequestsService],
    }).compile();

    controller = module.get<AbsenceRequestsController>(
      AbsenceRequestsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
