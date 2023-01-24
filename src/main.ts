import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config_service = app.get(ConfigService);
  const port = config_service.get<string>('PORT');
  await app.listen(port, () => console.log(`Server running on port ${port}`));
}
bootstrap();
