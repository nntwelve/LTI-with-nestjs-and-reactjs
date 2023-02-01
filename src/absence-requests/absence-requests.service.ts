import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ILtiVariables, USER_ROLE } from 'src/lti/lti.interface';
import { CreateAbsenceRequestDto } from './dto/create-absence-request.dto';
import { UpdateAbsenceRequestDto } from './dto/update-absence-request.dto';
import {
  AbsenceRequest,
  ABSENCE_REQUEST_STATUS,
  AbsenceRequestDocument,
} from './entities/absence-request.entity';

@Injectable()
export class AbsenceRequestsService {
  constructor(
    @InjectModel(AbsenceRequest.name)
    private absence_requests_model: Model<AbsenceRequestDocument>,
  ) {}
  async create(
    lti_vars: ILtiVariables,
    create_absence_request_dto: CreateAbsenceRequestDto,
  ) {
    if (isNaN(lti_vars.courseid as number)) {
      throw new BadRequestException();
    }
    return await this.absence_requests_model.create({
      reason: create_absence_request_dto.reason,
      date: new Date(create_absence_request_dto.date),
      student_id: lti_vars.userid,
      student_name: lti_vars.user_name,
      course_id: lti_vars.courseid,
    });
  }

  async findAll({
    lti_vars,
    offset,
    limit,
  }: {
    lti_vars: ILtiVariables;
    offset: number;
    limit: number;
  }) {
    const role = lti_vars.role.includes(USER_ROLE.ADMINISTRATOR)
      ? USER_ROLE.ADMINISTRATOR
      : lti_vars.role.includes(USER_ROLE.INSTRUCTOR)
      ? USER_ROLE.INSTRUCTOR
      : USER_ROLE.STUDENT;
    const filter = {};
    if (role === USER_ROLE.STUDENT) {
      filter['student_id'] = lti_vars.userid;
    }
    return await this.absence_requests_model
      .find(filter)
      .skip(offset)
      .limit(limit);
  }

  async update(
    _id: string,
    lti_vars: ILtiVariables,
    update_absence_request_dto: UpdateAbsenceRequestDto,
  ) {
    await this.absence_requests_model.updateOne(
      {
        _id,
        status: ABSENCE_REQUEST_STATUS.PENDING,
      },
      {
        status: update_absence_request_dto.is_approve
          ? ABSENCE_REQUEST_STATUS.APPROVED
          : ABSENCE_REQUEST_STATUS.REJECTED,
        confirmed_by_id: lti_vars.userid,
        confirmed_by_name: lti_vars.user_name,
      },
    );
    return await this.absence_requests_model.findById(_id);
  }
}
