import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Nest.js')
    .setDescription('Nest.js service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(7070);
}
bootstrap();
