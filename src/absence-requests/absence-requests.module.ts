import { Module } from '@nestjs/common';
import { AbsenceRequestsService } from './absence-requests.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AbsenceRequestsController } from './absence-requests.controller';
import {
  AbsenceRequest,
  AbsenceRequestSchema,
} from './entities/absence-request.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AbsenceRequest.name, schema: AbsenceRequestSchema },
    ]),
  ],
  controllers: [AbsenceRequestsController],
  providers: [AbsenceRequestsService],
})
export class AbsenceRequestsModule {}
