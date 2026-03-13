import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { runSeeders } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { seederOptions } from './data-source';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const dataSource = app.get(DataSource);

  await runSeeders(dataSource, seederOptions);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
