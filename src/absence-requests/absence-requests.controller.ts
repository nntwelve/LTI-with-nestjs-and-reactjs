import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { LtiVariables } from 'src/lti/lti.decorator';
import { ILtiVariables } from 'src/lti/lti.interface';
import { AbsenceRequestsService } from './absence-requests.service';
import { CreateAbsenceRequestDto } from './dto/create-absence-request.dto';
import { UpdateAbsenceRequestDto } from './dto/update-absence-request.dto';

@Controller('absence-requests')
export class AbsenceRequestsController {
  constructor(
    private readonly absence_requests_service: AbsenceRequestsService,
  ) {}

  @Post()
  async create(
    @LtiVariables() lti_vars: ILtiVariables,
    @Body() create_absence_request_dto: CreateAbsenceRequestDto,
  ) {
    return await this.absence_requests_service.create(
      lti_vars,
      create_absence_request_dto,
    );
  }

  @Get()
  async findAll(
    @LtiVariables() lti_vars: ILtiVariables,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.absence_requests_service.findAll({
      lti_vars,
      offset,
      limit,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @LtiVariables() lti_vars: ILtiVariables,
    @Body() update_absence_request_dto: UpdateAbsenceRequestDto,
  ) {
    return await this.absence_requests_service.update(
      id,
      lti_vars,
      update_absence_request_dto,
    );
  }
}
