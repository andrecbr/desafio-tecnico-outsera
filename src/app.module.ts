import { Module } from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { MovieModule } from './modules/movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';

@Module({
  imports: [MovieModule, TypeOrmModule.forRoot(dataSourceOptions)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
