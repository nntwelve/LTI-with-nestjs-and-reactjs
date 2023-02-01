import { Test, TestingModule } from '@nestjs/testing';
import { AbsenceRequestsService } from './absence-requests.service';

describe('AbsenceRequestsService', () => {
  let service: AbsenceRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbsenceRequestsService],
    }).compile();

    service = module.get<AbsenceRequestsService>(AbsenceRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
