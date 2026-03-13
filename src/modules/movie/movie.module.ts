import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MovieController } from '../../controllers/movie/movie.controller';
import { MovieService } from 'src/services/movie/movie.service';
import { DataConverterMiddleware } from 'src/middlewares/data-converter.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from 'src/entities/movie/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DataConverterMiddleware).forRoutes(MovieController);
  }
}
