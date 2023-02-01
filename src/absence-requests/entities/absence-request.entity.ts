import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum ABSENCE_REQUEST_STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export type AbsenceRequestDocument = HydratedDocument<AbsenceRequest>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'absence-requests',
})
export class AbsenceRequest {
  @Prop({
    required: true,
  })
  reason: string;

  @Prop({
    type: Number,
  })
  course_id: number;

  @Prop({
    type: Number,
    required: true,
  })
  student_id: number;

  @Prop({
    required: true,
  })
  student_name: string;

  @Prop({
    type: String,
    enum: ABSENCE_REQUEST_STATUS,
    default: ABSENCE_REQUEST_STATUS.PENDING,
    required: true,
  })
  status: ABSENCE_REQUEST_STATUS;

  @Prop({
    type: Date,
    required: true,
  })
  date: Date;

  @Prop({
    type: Number,
  })
  confirmed_by_id?: number;

  @Prop()
  confirmed_by_name?: string;
}

export const AbsenceRequestSchema =
  SchemaFactory.createForClass(AbsenceRequest);
