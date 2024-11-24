import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path'

async function bootstrap() {

  const envPath = path.join(__dirname, '..', '.env')
  dotenv.config({ path: envPath })

  console.log(`JwtSecretKey = ${process.env.JwtSecretKey}`)

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
