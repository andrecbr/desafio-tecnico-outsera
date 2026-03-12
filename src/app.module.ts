import { Module } from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { AppService } from './services/app/app.service';
import { MovieController } from './controllers/movie/movie.controller';
import { MovieService } from './services/movie/movie.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/moviedb')],
  controllers: [AppController, MovieController],
  providers: [AppService, MovieService],
})
export class AppModule {}
