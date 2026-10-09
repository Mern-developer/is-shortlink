import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'))
  await app.listen(process.env.PORT ?? 8888);
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
}
bootstrap();
