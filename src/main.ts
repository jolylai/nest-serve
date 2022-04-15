import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // 接收只在 DTO 中定义的属性
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
