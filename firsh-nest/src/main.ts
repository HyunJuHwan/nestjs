import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(GlobalPipes); //Global Pipes - 모든 요청에 대한 처리
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`Application listening on port ${port}`)
}
bootstrap();
