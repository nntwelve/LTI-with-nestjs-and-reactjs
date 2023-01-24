import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LtiModule } from './lti/lti.module';
import * as Joi from 'joi';

@Module({
  imports: [
    LtiModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_NAME: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        LTI_KEY: Joi.string().required(),
        LTI_HOST: Joi.string().required(),
        LTI_CLIENT_ID: Joi.string().required(),
        LTI_NAME: Joi.string().required(),
        LTI_ISS: Joi.string().required(),
      }),
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
