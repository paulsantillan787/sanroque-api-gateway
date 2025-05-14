import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { GlobalRpcExceptionFilter } from './common';

async function bootstrap() {
  const logger = new Logger('API_GATEWAY');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new GlobalRpcExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.enableCors({
    origin: envs.corsOrigin,
  })
  
  await app.listen( envs.port );
  logger.log(`API Gateway running on port ${envs.port}`);
}
bootstrap();
