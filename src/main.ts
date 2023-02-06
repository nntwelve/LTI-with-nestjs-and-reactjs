import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const shortid = require('shortid');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config_service = app.get(ConfigService);
  const port = config_service.get<string>('PORT');
  console.log(shortid.generate());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () => console.log(`Server running on port ${port}`));
}
bootstrap();
