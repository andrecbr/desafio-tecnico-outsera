import { Module } from '@nestjs/common';
import { MovieController } from '../../controllers/movie/movie.controller';
import { MovieService } from 'src/services/movie/movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from 'src/entities/movie/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
