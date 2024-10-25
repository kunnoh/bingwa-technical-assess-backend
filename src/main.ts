import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Add delay to wait for mysql finish booting up
  // await new Promise(resolve => setTimeout(resolve, 10000));

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
