import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LtiModule } from './lti/lti.module';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { AbsenceRequestsModule } from './absence-requests/absence-requests.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config_service: ConfigService) => ({
        uri: `${config_service.get<string>(
          'DATABASE_URI',
        )}/${config_service.get<string>('DATABASE_API_NAME')}`,
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../client'),
    }),
    LtiModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_API_NAME: Joi.string().required(),
        DATABASE_LTIJS_NAME: Joi.string().required(),
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
    AbsenceRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
