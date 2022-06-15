import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('api', {
    exclude: ['login', 'register'],
  });

  // interceptors
  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      // 接收只在 DTO 中定义的属性
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(7070);
}
bootstrap();
